import { TestBed, inject } from '@angular/core/testing';

import { RequestAPIService } from './request-api.service';

describe('RequestAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestAPIService]
    });
  });

  it('should be created', inject([RequestAPIService], (service: RequestAPIService) => {
    expect(service).toBeTruthy();
  }));
});
