import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../../models';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';

@Component({
    selector: 'mole-image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrls: ['./image-dialog.component.scss'],
    imports: [ImageUploadComponent, ImageGalleryComponent]
})
export class ImageDialogComponent implements OnInit, OnDestroy {

  @Input() title: boolean = true;

  @Output() newImagesEvent = new EventEmitter<FileList>();

  localImages: FileList;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event
  ) { }

  ngOnInit(): void {
  }

  addNewImages(images: FileList) {
    this.localImages = images;
    this.newImagesEvent.emit(this.localImages);
  }

  ngOnDestroy(): void {
    delete this.localImages;
  }


}
