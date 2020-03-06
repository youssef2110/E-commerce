import { Component, OnInit, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navprod',
  templateUrl: './navprod.component.html',
  styleUrls: ['./navprod.component.scss']
})
export class NavprodComponent implements OnInit {
  @Output() Event1 = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  change(name){
    this.Event1.emit(name);
  }
}
