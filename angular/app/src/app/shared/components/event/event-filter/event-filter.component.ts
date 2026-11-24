import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import {EventApiService} from "../../../services";
import {Subscription} from "rxjs";
import {EventFilter, EventFilterChip, EventType} from "../../../models";
import { MatCard } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { EventTypeCardsComponent } from '../event-type-cards/event-type-cards.component';
import { EventFilterFormComponent } from '../event-filter-form/event-filter-form.component';

@Component({
    selector: 'mole-event-filter',
    templateUrl: './event-filter.component.html',
    styleUrls: ['./event-filter.component.scss'],
    imports: [MatCard, FlexModule, EventTypeCardsComponent, EventFilterFormComponent]
})
export class EventFilterComponent implements OnInit, OnDestroy {
  private eventService = inject(EventApiService);

  @Input() useCards: boolean = true;
  @Input() useForm: boolean = true;
  @Output() countNotification = new EventEmitter<number>();
  private subscriptions = new Subscription();
  public currentFilterTypes: EventType[];
  public currentFilterMeta: string[];

  ngOnInit(): void {
    this.currentFilterTypes = [];

    this.subscriptions.add(
      this.eventService.filterChangedNotification().subscribe(
        (data:EventFilter) => {
          if(data) {
            this.currentFilterTypes = data.types.slice();
            this.currentFilterMeta = data.metadata.slice();
          }
        }
      )
    )
  }

  cardsUpdate(event_types: EventType[]) {
    this.currentFilterTypes = event_types;
    this.eventService.updateFilter(this.currentFilterTypes, null, null, null);
  }

  notifyCount(count) {
    this.countNotification.emit(count);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
