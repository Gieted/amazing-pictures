import { TestBed } from '@angular/core/testing';

import { PictureUploadService } from './picture-upload.service';

describe('PictureUploadService', () => {
  let service: PictureUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
