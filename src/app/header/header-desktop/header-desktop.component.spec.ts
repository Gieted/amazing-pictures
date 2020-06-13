import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDesktopComponent } from './header-desktop.component';

describe('HeaderComponent', () => {
  let component: HeaderDesktopComponent;
  let fixture: ComponentFixture<HeaderDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
