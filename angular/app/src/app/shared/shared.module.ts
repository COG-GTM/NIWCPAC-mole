import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartsWithPipe, IncludesSubstrPipe, DurationFromMillisecondsPipe, DurationToFormatPipe } from './pipes';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { RouterModule } from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';

import { MoleMatModule } from './molemat.module';
import {
  MapsComponent,
  MapInstanceComponent,
  CesiumInstanceComponent,
  ContextMenuLayerComponent,
  CesiumContextMenuComponent,
  MarkerPopupComponent,
  MarkerComponent,
  TrialCreatorComponent,
  HeaderBarComponent,
  TimelineComponent,
  TimelineCardComponent,
  EventDialogComponent,
  NotesDialogComponent,
  EventTypeButtonComponent,
  EventCreatorComponent,
  ImageDialogComponent,
  ImageUploadComponent,
  ImageGalleryComponent,
  EventFilterComponent,
  EventFilterFormComponent,
  EventTypeCardsComponent,
  EventTypeCardComponent,
  EventFilterChipsComponent,
  EventFilterChipComponent,

} from "./components";


import { AngularCesiumModule } from '@auscope/angular-cesium';
import { AngularCesiumWidgetsModule } from '@auscope/angular-cesium'

@NgModule({
  declarations: [
    MapsComponent,
    MapInstanceComponent,
    CesiumInstanceComponent,
    ContextMenuLayerComponent,
    CesiumContextMenuComponent,
    MarkerPopupComponent,
    MarkerComponent,
    TrialCreatorComponent,
    HeaderBarComponent,
    TimelineComponent,
    TimelineCardComponent,
    EventDialogComponent,
    EventTypeButtonComponent,
    EventCreatorComponent,
    StartsWithPipe,
    DurationFromMillisecondsPipe,
    DurationToFormatPipe,
    IncludesSubstrPipe,
    NotesDialogComponent,
    ImageDialogComponent,
    ImageUploadComponent,
    ImageGalleryComponent,
    EventFilterComponent,
    EventFilterFormComponent,
    EventTypeCardsComponent,
    EventTypeCardComponent,
    EventFilterChipsComponent,
    EventFilterChipComponent,
  ],
  exports: [
    MapsComponent,
    MapInstanceComponent,
    CesiumInstanceComponent,
    TrialCreatorComponent,
    HeaderBarComponent,
    TimelineComponent,
    TimelineCardComponent,
    EventDialogComponent,
    EventTypeButtonComponent,
    EventCreatorComponent,
    StartsWithPipe,
    DurationFromMillisecondsPipe,
    DurationToFormatPipe,
    IncludesSubstrPipe,
    EventFilterComponent,
    EventFilterFormComponent,
    EventTypeCardsComponent,
    EventTypeCardComponent,
    EventFilterChipsComponent,
    EventFilterChipComponent,
  ],
  imports: [
    CommonModule,
    MoleMatModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ScrollingModule,
    GalleryModule,
    LightboxModule,
    FontAwesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule,
    RouterModule,
    NgPipesModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
