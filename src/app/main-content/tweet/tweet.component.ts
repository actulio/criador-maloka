import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface DialogData {
  name: string;
  userAt: string;
  imgUrl: string;
}


@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() fontSize: number;
  @Input() borderRadius: number;
  @Input() text: string;

  userData = {
    name: 'Criador Maloka',
    userAt: 'criadormaloka',
    imgUrl: '',
  };

  constructor(public dialog: MatDialog, ) { }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UserInfoDialog, {
      width: '320px',
      data: this.userData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result){
        this.userData = result;
      }
    });
  }
}

@Component({
  selector: 'user-info-dialog',
  templateUrl: 'user-info-dialog.html',
  styleUrls: ['./user-info-dialog.scss']
})
export class UserInfoDialog {

  userInfoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    userAt: new FormControl('', Validators.required),
    imgUrl: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<UserInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onOkClick(): void {
    this.dialogRef.close( this.userInfoForm.value);
  }

  onFileChanged(event: Event) {
    const reader = new FileReader();
    const selectedFile = (event.target as HTMLInputElement).files[0];
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      this.userInfoForm.controls.imgUrl.setValue(
        `url(${reader.result})`
      )
    };
  }

}
