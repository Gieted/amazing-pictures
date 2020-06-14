import { TestBed } from '@angular/core/testing';

import { PictureDeleteService } from './picture-delete.service';

describe('PictureDeleteService', () => {
  let service: PictureDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
