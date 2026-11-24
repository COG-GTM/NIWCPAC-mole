import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
    ], imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
    AngularCesiumWidgetsModule, MapsComponent,
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
    EventFilterChipComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {
  constructor() {
    const library = inject(FaIconLibrary);

    library.addIconPacks(fas);
  }
}
