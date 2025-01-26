import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { footballFactResolver } from './football-fact.resolver';

describe('footballFactResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => footballFactResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
