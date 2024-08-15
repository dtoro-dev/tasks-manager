import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {
  }

}
