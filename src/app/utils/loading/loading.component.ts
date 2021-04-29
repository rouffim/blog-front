import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-utils-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() show = false;

  constructor() { }

  ngOnInit(): void {
  }

}
