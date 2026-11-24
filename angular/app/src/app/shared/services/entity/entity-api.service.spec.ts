import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TrialApiService } from '../trial/trial-api.service';


import { EntityApiService } from './entity-api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EntityApiService', () => {
  let service: EntityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [TrialApiService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(EntityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
