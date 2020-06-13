import { TestBed } from '@angular/core/testing';

import { ProgressBar } from './progress-bar.service';

describe('ProgressBarService', () => {
  let service: ProgressBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
