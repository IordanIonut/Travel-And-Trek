import { TestBed } from '@angular/core/testing';

import { AppCreateService } from './app-create.service';

describe('AppCreateService', () => {
  let service: AppCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
