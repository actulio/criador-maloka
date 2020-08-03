import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common'
import html2canvas from 'html2canvas';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  @ViewChild('divToPrint') divToPrint: ElementRef;

  imageUrl: string;
  selectedFile: File;

  constructor() {}

  ngOnInit(): void {}

  onFileChanged(event) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onloadend = () => {
      this.imageUrl = `url(${reader.result})`;
    };
  }

  downloadImage() {

    html2canvas(this.divToPrint.nativeElement, {
      canvas: document.querySelector('canvas'),
      windowWidth: 1080,
      windowHeight: 1080,
      width: 1080,
      height: 1080,
      onclone: (canvas) => {
        // Apenas uma das estrategias usadas, a de tentar redimensionar o elemento DOM
        // antes de ser salvo. A outra opção seria criar uma div escondida/fora da tela
        // já com o tamanho certo.
        const div = canvas.getElementById('divToPrint');
        const content = canvas.getElementById('content');
        content.style.height = '200px'

        div.style.margin = '0';
        div.style.padding = '0'
        div.style.boxShadow = 'none'
        div.style.width = '1080px';
        div.style.height = '1080px';
        div.style.maxWidth = '1080px';
        div.style.maxHeight = '1080px';
        div.style.backgroundColor = 'blue';
      }

    }).then((canvas) => {
        const link = document.createElement('a');
        link.download = this.createFileName();
        link.href = canvas.toDataURL();
        link.click();
        link.remove();
    });
  }

  private createFileName(): string {
    const formattedDate = new DatePipe('en-US').transform(
      new Date(),
      'yyyy-MM-dd hh:mm:ss'
    );
    return `Criador Maloka as ${formattedDate}.png`;
  }
}
