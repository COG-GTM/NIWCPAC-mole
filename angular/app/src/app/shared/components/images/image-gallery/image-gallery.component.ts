import { Component, OnInit, Input, inject } from '@angular/core';
import { Event } from '../../../models'
import { EventApiService } from 'src/app/shared/services';
import { LightboxModule } from 'ng-gallery/lightbox';


@Component({
    selector: 'mole-image-gallery',
    templateUrl: './image-gallery.component.html',
    styleUrls: ['./image-gallery.component.scss'],
    imports: [LightboxModule]
})
export class ImageGalleryComponent implements OnInit {
  private _eventApiService = inject(EventApiService);


  @Input() event: Event;
  @Input() newImages: FileList;
  eventObservable = this._eventApiService.getSingleEvent();

  ngOnInit(): void {
    this.eventObservable.subscribe(
      (event: Event) => {
        this.event = event;
      }
    )
  }

}
