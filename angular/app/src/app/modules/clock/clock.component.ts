import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClockService } from './service/clock.service';
import { MatCard } from '@angular/material/card';
import { TimerCardComponent } from './timer-card/timer-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'mole-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
    imports: [MatCard, TimerCardComponent, AsyncPipe]
})
export class ClockComponent implements OnInit {
  private _clockService = inject(ClockService);


  pageTitle: string = "Clock";
  clockStream: Observable<string>;

  constructor() {

    this.clockStream = this._clockService.getClockStream();
  }

  ngOnInit(): void {
  }

}
