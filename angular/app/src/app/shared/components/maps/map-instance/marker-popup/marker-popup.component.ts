import { Component, OnInit, Input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'mole-marker-popup',
    templateUrl: './marker-popup.component.html',
    styleUrls: ['./marker-popup.component.scss'],
    imports: [MatButton]
})
export class MarkerPopupComponent implements OnInit {

  readonly popClick = output<number>();
  @Input() buttonText: string;

  constructor() { }

  ngOnInit(): void {
  }

  buttonClick(){
    this.popClick.emit(1);
  }

}
