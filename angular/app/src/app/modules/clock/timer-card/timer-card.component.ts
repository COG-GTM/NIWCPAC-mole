import { Component, OnDestroy, OnInit, inject, input, output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockStream } from '../service/clock.model';
import { ClockService } from '../service/clock.service';
import { MatCard, MatCardContent } from '@angular/material/card';


@Component({
    selector: 'mole-timer-card',
    templateUrl: './timer-card.component.html',
    styleUrls: ['./timer-card.component.scss'],
    imports: [MatCard, MatCardContent]
})
export class TimerCardComponent implements OnInit, OnDestroy {
  private _clockService = inject(ClockService);


  readonly minor = input<boolean>(undefined);
  readonly major = input<boolean>(undefined);
  readonly reported = input<boolean>(undefined);
  
  readonly clockStreamOut = output<ClockStream>();
  readonly clockTimeStringOut = output<string>();

  private subscriptions: Subscription;

  timerStream: ClockStream = {
    message: "Awaiting clock configuration...",
    messageOnly: false,
    seconds: 0
  };
  timeString: string = "--:--:--";
  
  constructor() {
    this.subscriptions = new Subscription();
  }

  formatSeconds(seconds): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  ngOnInit(): void {

    this.subscriptions.add(this._clockService.getTimerStream().subscribe(
      stream => {
        if (stream) {
          this.timerStream = stream;

          if (this.minor()) {
            if (stream.minor) {
              this.timerStream = stream.minor;
            }
          }
          else if (this.major()) {
            if (stream.major) {
              this.timerStream = stream.major;
            }
          }
          else if (this.reported()) {
            if (stream.reported) {
              this.timerStream = stream.reported;
            }
          }

          this.timeString = this.formatSeconds(this.timerStream.seconds);
        }
        else {
          this.timerStream = {
            message: "Awaiting clock configuration...",
            messageOnly: true,
            seconds: 0
          };
          this.timeString = "--:--:--";
        }

        this.clockStreamOut.emit(this.timerStream);
        this.clockTimeStringOut.emit(this.timeString);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
