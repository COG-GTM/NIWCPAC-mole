import { Component, OnInit, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'mole-marker',
    templateUrl: './marker.component.html',
    styleUrls: ['./marker.component.scss'],
    imports: [FaIconComponent]
})
export class MarkerComponent implements OnInit {

  @Input() point_style;
  @Input() large_size: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
