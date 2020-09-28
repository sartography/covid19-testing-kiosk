import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiError} from '../models/apiError.interface';
import {AppEnvironment} from '../models/appEnvironment.interface';
import {Sample} from '../models/sample.interface';
import {TestingLocation} from '../models/testingLocation.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot: string;
  endpoints = {
    locations: '/location',
    location: '/location/{id}',
    sample: '/sample',
  };

  constructor(
    @Inject('APP_ENVIRONMENT') private environment: AppEnvironment,
    @Inject(APP_BASE_HREF) public baseHref: string,
    private httpClient: HttpClient,
  ) {
    this.apiRoot = environment.api;
  }

  /** Get list of all testing locations */
  getLocations(): Observable<TestingLocation[]> {
    const url = this.apiRoot + this.endpoints.locations;

    return this.httpClient
      .get<TestingLocation[]>(url)
      .pipe(catchError(err => this._handleError(err)));
  }

  /** Get specific location */
  getLocation(locationId: string): Observable<TestingLocation> {
    const url = this.apiRoot + this.endpoints.location.replace('{id}', locationId);

    return this.httpClient
      .get<TestingLocation>(url)
      .pipe(catchError(err => this._handleError(err)));
  }

  /** Add new sample */
  addSample(sample: Sample): Observable<Sample> {
    const url = this.apiRoot + this.endpoints.sample;

    return this.httpClient
      .post<Sample>(url, sample)
      .pipe(catchError(err => this._handleError(err)));
  }

  private _handleError(error: ApiError): Observable<never> {
    return throwError(error.message || 'Could not complete your request; please try again later.');
  }
}
