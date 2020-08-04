import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { TweetComponent } from './tweet/tweet.component'

import html2canvas from 'html2canvas';


@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @ViewChild('hiddenDiv') divToPrint: ElementRef;
  imageUrl: string;
  selectedFile: File;

  // hidden-div related
  @ViewChild(TweetComponent) child: TweetComponent;
  userData = {
    name: 'Criador Maloka',
    userAt: '@criadormaloka',
    imgUrl: ''
  }
  //

  onFileChanged(event: Event) {
    const reader = new FileReader();
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onloadend = () => {
      this.imageUrl = `url(${reader.result})`;
    };
  }

  downloadImage() {
    this.userData = this.child.userData; // hidden-div related
    html2canvas(this.divToPrint.nativeElement, {
      windowWidth: 1080,
      windowHeight: 1080,
      width: 1080,
      height: 1080,
      onclone: (canvas) => {
        const div = canvas.getElementById('hidden-div');
        div.style.display = 'flex';
        div.style.margin = '0';
      },
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = this.createFileName();
      link.href = canvas.toDataURL();
      link.click();
      link.remove();
    });
  }

  private createFileName(): string {
    const date = new Date();
    return `Criador Maloka em ${date.toLocaleDateString()} as ${date
      .toLocaleTimeString()
      .replace(/:/g, '.')}.png`;
  }
}
