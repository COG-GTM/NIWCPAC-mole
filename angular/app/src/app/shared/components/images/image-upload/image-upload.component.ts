import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { EventApiService } from '../../../services';
import { Event } from '../../../models';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'mole-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    imports: [MatButton, MatIcon, MatProgressBar]
})
export class ImageUploadComponent implements OnInit {
  private _eventApiService = inject(EventApiService);


  @Input() event: Event;
  @Output() newImagesUploadEvent = new EventEmitter<FileList>();
  imagesToUpload: FileList = null;
  uploadingImage: boolean = false;

  ngOnInit(): void {
  }

  // called after user selects images and hits 'Done'
  handleImageInput(event) {
    this.imagesToUpload = event.target.files;

    // event exists in db
    if (this.event.url) {
      this._eventApiService.uploadEventImages(this.event, this.imagesToUpload);
    }
    
    // new event, not yet in db
    else {
      this.newImagesUploadEvent.emit(this.imagesToUpload);
    }
    
  }
}
