import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {TestingLocation} from '../models/testingLocation.interface';
import {ApiService} from '../services/api.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements AfterViewInit {
  numPeopleFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000),
  ]);
  @ViewChild('numPeopleInput') numPeopleInput: MatInput;
  numMaskViolationsFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000),
  ]);
  testingLocation: TestingLocation;

  get hasInvalidValues(): boolean {
    const numMaskViolations = parseInt(this.numMaskViolationsFormControl.value, 10);
    const numPeople = parseInt(this.numPeopleFormControl.value, 10);
    return numPeople < numMaskViolations;
  }

  get hasErrors(): boolean {
    return !this.numPeopleFormControl.valid;
  }

  constructor(
    private api: ApiService,
    private settingsService: SettingsService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    const settings = this.settingsService.getSettings();
    this.api.getLocation(settings.locationId).subscribe(l => this.testingLocation = l);
  }

  ngAfterViewInit() {
    this.numPeopleInput.focus();
    this.changeDetector.detectChanges();
  }

  save() {
    if (!this.hasErrors) {
      // TODO: Upload new count to backend.
      this.router.navigate(['/']);
    }
  }

}
