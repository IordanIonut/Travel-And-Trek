import { TestBed } from '@angular/core/testing';

import { SetThemeService } from './set-theme.service';

describe('SetThemeService', () => {
  let service: SetThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
