import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {EventApiService} from "../../../../../shared/services";
import {EventFilter, EventType} from "../../../../../shared/models";
import {Subscription} from "rxjs";
import {EventApiAdapters} from "../../../../../shared/services/event/event-api.adapter";
import { MatCard, MatCardHeader, MatCardContent, MatCardAvatar } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { NgClass, NgStyle } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'mole-summary-card',
    templateUrl: './summary-card.component.html',
    styleUrls: ['./summary-card.component.scss'],
    imports: [MatCard, FlexModule, NgClass, ExtendedModule, MatCardHeader, MatCardContent, FaIconComponent, MatCardAvatar, NgStyle]
})
export class SummaryCardComponent implements OnInit, OnDestroy {
  private eventService = inject(EventApiService);

  @Input() eventType;
  @Input() count;

  private subscriptions = new Subscription();
  isActive = false;

  ngOnInit(): void {
    //this.currentFilter = this.eventService.getCurrentFilter();
    //this.updateActiveState();
    this.subscriptions.add(
      this.eventService.filterChangedNotification().subscribe(
        (data:EventFilter) => {
          if(data) {
            this.updateActiveState(data);
          }
        }
      )
    )
  }

  updateActiveState(filter: EventFilter) {
    const filterPresent = filter.types.find(activeFilter => activeFilter.name === this.eventType.name);
    if (filterPresent) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  toggleFilter() {
    // if (this.isActive) {
    //   // remove from filter types
    //   const currentType = this.eventType;
    //   let newTypes: EventType[] = this.currentFilter.types.filter(function (filterType) {
    //     return filterType.name !== currentType.name;
    //   });
    //   this.currentFilter.types = newTypes;
    // } else {
    //   // need to add to types
    //   this.currentFilter.types.push(this.eventType)
    // }
    // this.eventService.setPagedFilter(this.currentFilter);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
