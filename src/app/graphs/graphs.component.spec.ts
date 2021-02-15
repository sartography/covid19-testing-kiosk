import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomDateAdapter, CustomDatePipe } from '../pipes/custom-date-adapter';
import { PipesModule } from '../pipes/pipes.module';
import { ApiService } from '../services/api.service';
import { MockEnvironment } from '../testing/environment.mock';
import { GraphsComponent } from './graphs.component';

@Pipe({
    name: 'date',
    pure: false // required to update the value when the promise is resolved
})

export class MockedDatePipe implements PipeTransform {
    name = 'date';

    transform(query: string, ...args: any[]): any {
        return query;
    }
}

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;
  let httpMock: HttpTestingController;
  const mockEnvironment = new MockEnvironment();
  const mockRouter = {
    createUrlTree: jasmine.createSpy('createUrlTree'),
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomDatePipe,
        MockedDatePipe,
      ],
      imports: [
        CommonModule,
        PipesModule,
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
        CustomDateAdapter,
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
