import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerComponent } from './marker.component';

describe('MarkerComponent', () => {
  let component: MarkerComponent;
  let fixture: ComponentFixture<MarkerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [MarkerComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerComponent);
    component = fixture.componentInstance;
    component.point_style = {}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
