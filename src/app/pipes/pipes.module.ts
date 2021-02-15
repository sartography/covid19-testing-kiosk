import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomDatePipe } from './custom-date-adapter';



@NgModule({
  declarations: [
    CustomDatePipe,
    // DatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatePipe,
    // DatePipe,
  ],
})
export class PipesModule { }
