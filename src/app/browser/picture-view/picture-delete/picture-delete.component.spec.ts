import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDeleteComponent } from './picture-delete.component';

describe('PictureDeleteComponent', () => {
  let component: PictureDeleteComponent;
  let fixture: ComponentFixture<PictureDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
