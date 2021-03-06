import { TestBed } from '@angular/core/testing';

import { GraphService } from './graph.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiService} from './api.service';
import {APP_BASE_HREF} from '@angular/common';
import {Router} from '@angular/router';
import {MockEnvironment} from '../testing/environment.mock';

describe('GraphService', () => {
  let httpMock: HttpTestingController;
  let location: Location;
  let service: GraphService;
  const mockEnvironment = new MockEnvironment();
  const mockRouter = {
    createUrlTree: jasmine.createSpy('createUrlTree'),
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatBottomSheetModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        ApiService,
        {provide: 'APP_ENVIRONMENT', useValue: mockEnvironment},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: Router, useValue: mockRouter},
        {provide: Location, useValue: location},
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GraphService);
    location = TestBed.inject(Location);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
