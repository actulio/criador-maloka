import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() fontSize: number;
  @Input() borderRadius: number;
  @Input() text: string;
  @Input() profileImage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
