import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  imageUrl: string;
  constructor() { }

  selectedFile: File;

  ngOnInit(): void {
  }

  onFileChanged(event) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onloadend = () => {
      this.imageUrl = `url(${reader.result})`;
    }

  }

}
