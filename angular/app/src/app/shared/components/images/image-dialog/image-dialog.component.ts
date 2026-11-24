import { Component, OnInit, Input, OnDestroy, inject, output } from '@angular/core';
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
  dialogRef = inject<MatDialogRef<ImageDialogComponent>>(MatDialogRef);
  event = inject<Event>(MAT_DIALOG_DATA);


  @Input() title: boolean = true;

  readonly newImagesEvent = output<FileList>();

  localImages: FileList;

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
