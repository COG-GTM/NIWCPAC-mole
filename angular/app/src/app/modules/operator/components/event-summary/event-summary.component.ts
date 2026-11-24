import { AfterViewInit, Component, OnDestroy, OnInit, inject, viewChildren } from '@angular/core';
import {Subscription} from 'rxjs';

import {EventApiService, EventTypeApiService, TrialApiService} from '../../../../shared/services';
import {EventType, TrialEventCount} from '../../../../shared/models';
import {SummaryCardComponent} from "./summary-card/summary-card.component";
import {EventFilter} from "../../../../shared/models/event.model";
import { FlexModule } from '@angular/flex-layout/flex';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgStyle, NgClass } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'mole-event-summary',
    templateUrl: './event-summary.component.html',
    styleUrls: ['./event-summary.component.scss'],
    imports: [FlexModule, MatProgressSpinner, NgStyle, ExtendedModule, MatCard, MatCardTitle, MatIcon, MatChip, MatButton, NgClass, SummaryCardComponent]
})
export class EventSummaryComponent implements OnInit, OnDestroy{
  private trialService = inject(TrialApiService);
  private eventTypeService = inject(EventTypeApiService);
  private eventService = inject(EventApiService);

  private subscriptions = new Subscription();
  public currentFilter: EventFilter;
  public currentEventCounts: TrialEventCount;
  public eventTypes: EventType[];
  allActive = false;
  readonly eventTypeCards = viewChildren<SummaryCardComponent>('eventTypeCard');

  ngOnInit(): void {
    this.subscriptions.add(
      this.trialService.getEventCount().subscribe(
        (data: TrialEventCount) => {
          if(data) {
            this.currentEventCounts = data;
          }
        }
      )
    );

    this.subscriptions.add(
      this.eventTypeService.getEventTypes().subscribe(
        (data: EventType[]) => {
          if(data) {
            this.eventTypes = data;
          }
        }
      )
    );

    // this.currentFilter = this.eventService.getCurrentFilter();
    this.subscriptions.add(
      this.eventService.filterChangedNotification().subscribe(
        (data:EventFilter) => {
          if(data) {
            this.currentFilter = data;
          }
        }
      )
    )


  }

  getTypeCount(eventType: string): number {
    let count = 0;
    if (this.currentEventCounts) {
      const typeCount = this.currentEventCounts.events.find(type => type.name === eventType);
      if (typeCount) {
        count = typeCount.count;
      }
    }
    return count;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clearFilters() {
    this.currentFilter.types = []
    this.eventService.setPagedFilter(this.currentFilter);
  }
}
