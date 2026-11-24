import {Component, Input, OnInit, output} from '@angular/core';
import { MatCard, MatCardAvatar } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { NgClass, NgStyle } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'mole-event-type-card',
    templateUrl: './event-type-card.component.html',
    styleUrls: ['./event-type-card.component.scss'],
    imports: [MatCard, FlexModule, NgClass, ExtendedModule, FaIconComponent, MatCardAvatar, NgStyle]
})
export class EventTypeCardComponent implements OnInit {
  @Input() eventType;
  @Input() useTitle = false;
  @Input() count;
  @Input() useToggle = true;
  readonly cardClicked = output<any>();

  public isActive = false;

  constructor() { }

  ngOnInit(): void {}

  onClick() {
    if(this.useToggle) {
      this.isActive = !this.isActive;
    }
    this.cardClicked.emit({eventType: this.eventType, active: this.isActive});
  }

}
