import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {labelLayouts} from '../config/defaults';
import {AppDefaults} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';
import {TestingLocation} from '../models/testingLocation.interface';
import {ApiService} from '../services/api.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: AppDefaults;
  numCopiesFormControl: FormControl;
  labelLayoutFormControl: FormControl;
  locationIdFormControl: FormControl;
  labelLayouts: LabelLayout[];
  testingLocations: TestingLocation[];

  constructor(
    private api: ApiService,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
    this.api.getLocations().subscribe(locs => this.testingLocations = locs);

    this.numCopiesFormControl = new FormControl(this.settings.numCopies, [
      Validators.required,
    ]);

    this.labelLayoutFormControl = new FormControl(this.settings.labelLayout.type, [
      Validators.required,
    ]);

    this.locationIdFormControl = new FormControl(this.settings.locationId, [
      Validators.required,
      Validators.pattern(this.settings.locationIdRegExp),
    ]);

    this.labelLayouts = Object.values(labelLayouts);
  }

  get hasInfo(): boolean {
    return this.numCopiesFormControl.valid && this.locationIdFormControl.valid;
  }

  ngOnInit(): void {
  }

  save() {
    this.settingsService.saveSettings({
      labelLayout: labelLayouts[this.labelLayoutFormControl.value],
      numCopies: this.numCopiesFormControl.value,
      locationId: this.locationIdFormControl.value,
    });
    this.router.navigate(['/']);
  }
}
