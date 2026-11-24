import { Component, OnInit, OnDestroy } from '@angular/core';
import {EventType, Event} from "../../shared/models";
import { EventApiService } from 'src/app/shared/services';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatCard } from '@angular/material/card';
import { MapsComponent } from '../../shared/components/maps/maps.component';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatChip } from '@angular/material/chips';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { EventCreatorComponent } from '../../shared/components/event/event-creator/event-creator.component';
import { EventFilterComponent } from '../../shared/components/event/event-filter/event-filter.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgStyle } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { TimelineCardComponent } from '../../shared/components/timeline/timeline-card/timeline-card.component';
import { EventFilterChipsComponent } from '../../shared/components/event/event-filter-chips/event-filter-chips.component';
import { TimelineComponent } from '../../shared/components/timeline/timeline.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-operator',
    templateUrl: './operator.component.html',
    styleUrls: ['./operator.component.scss'],
    imports: [FlexModule, MatCard, MapsComponent, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, FaIconComponent, MatExpansionPanelDescription, MatChip, MatTabGroup, MatTab, MatTabLabel, EventCreatorComponent, EventFilterComponent, MatCheckbox, NgStyle, ExtendedModule, TimelineCardComponent, EventFilterChipsComponent, TimelineComponent, RouterOutlet]
})
export class OperatorComponent implements OnInit {
  pageTitle: string;
  badgeCount: number;
  selectedEventObservable = this._eventApiService.getSelectedEventObject();
  trackLiveEventObservable = this._eventApiService.getIsTrackingLiveEvent();

  selectedEvent: Event;
  openEventAccordion: boolean = false;
  selectedTabIndex: number = 0;

  trackLive: boolean = false;
  liveStyle = {'color': 'red', 'font-size': '0.7em'}

  constructor(
    private _eventApiService: EventApiService
  ) {
    this.pageTitle = "Operator";
  }

  ngOnInit(): void {
    this.selectedEventObservable.subscribe(event => {
      if (event) {
        this.selectedEvent = event;

        if (!this.trackLive) {
          this.selectedTabIndex = 2;
        }
        this.openEventAccordion = true;
        
      }
      else {
        this.selectedEvent = null;
        this.openEventAccordion = false;
      }
    });

    this._eventApiService.setLiveEventTracking(this.trackLive);
    this.trackLiveEventObservable.subscribe(isLive => {
      this.toggleTrackLive(isLive, false);
    });
  }

  onAccordionClose() {
    this.openEventAccordion = false;
    this.selectedTabIndex = 0;
    this._eventApiService.setLiveEventTracking(false);
  }

  badgeUpdate(count) {
    this.badgeCount = count;
  }

  onTabChange(event) {
  }

  toggleTrackLive(val, sendUpdate=true) {
    
    this.trackLive = val;
    this.liveStyle = this.trackLive ? {
      'color': 'red', 'font-size': '0.7em'
    } : {
      'color': 'grey', 'font-size': '0.7em'
    };

    if (sendUpdate) {
      this._eventApiService.setLiveEventTracking(this.trackLive);
    }
    
  }

  testAction(eventType: EventType) {
    console.log("Create Event: " + eventType.name);
  }
}
