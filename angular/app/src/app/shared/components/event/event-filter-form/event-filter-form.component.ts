import { Component, OnInit, ElementRef, OnDestroy, Input, inject, viewChild } from '@angular/core';
import { EventApiService, EventTypeApiService } from '../../../services';
import { EventFilter } from '../../../models';
import { EventType } from '../../../models'
import {Observable, Subscription} from 'rxjs';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatFormField, MatLabel, MatInput, MatSuffix } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatSelectSearchComponent } from 'ngx-mat-select-search';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgStyle, AsyncPipe } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgArrayPipesModule } from 'ngx-pipes';
import { IncludesSubstrPipe } from '../../../pipes/includessubstr.pipe';

@Component({
    selector: 'mole-event-filter-form',
    templateUrl: './event-filter-form.component.html',
    styleUrls: ['./event-filter-form.component.scss'],
    imports: [MatCard, FlexModule, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatSelectSearchComponent, MatOption, FaIconComponent, NgStyle, ExtendedModule, MatInput, MatIconButton, MatSuffix, MatIcon, MatCheckbox, AsyncPipe, NgArrayPipesModule, IncludesSubstrPipe]
})
export class EventFilterFormComponent implements OnInit, OnDestroy {
  private _eventApiService = inject(EventApiService);
  private _eventTypeService = inject(EventTypeApiService);
  private fb = inject(UntypedFormBuilder);

  @Input() useTypesField: boolean = true;
  @Input() useMetaField: boolean = true;
  @Input() useLevelField: boolean = true;
  @Input() usePoseField: boolean = true;

  readonly metadataInput = viewChild<ElementRef>('filterMetadata');

  private subscriptions = new Subscription();
  options: UntypedFormGroup;
  typesFilter: UntypedFormControl = new UntypedFormControl();
  order: string = 'name';
  eventTypesSelectionFilter: string = '';
  filter: EventFilter;
  eventTypesObservable: Observable<EventType[]> = this._eventTypeService.getEventTypes();

  ngOnInit(): void {
    this.options = this.fb.group({
      types: [],
      hasPose: '',
      metadata: '',
      level: ['', Validators.min(0)]
    })


    this.filter = this._eventApiService.getCurrentFilter();

    this.subscriptions.add(
      this.typesFilter.valueChanges.subscribe(() => {
        this.eventTypesSelectionFilter = this.typesFilter.value;
      })
    );

    this.subscriptions.add(
      this._eventApiService.filterChangedNotification().subscribe(
        (data:EventFilter) => {
          if(data) {
            this.filter = data;
            this.options.setValue(this.filter);
          }

        }
      )
    );
  }

  onTypesChange() {
    this._eventApiService.setPagedFilter(this.options.value);
  }

  onPoseFilterChange(checked) {
    this.filter.hasPose = checked;
    this._eventApiService.setPagedFilter(this.filter);
  }

  onEventLevelFilterChange(level) {
    this.filter.level = level;
    this._eventApiService.setPagedFilter(this.filter);
  }


  updateFilter() {
    this._eventApiService.setPagedFilter(this.filter);
  }

  addMetadata(metadata: string) {
    this.filter.metadata.push(metadata);
    this.options.patchValue({metadata: ''});
    this.updateFilter();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
