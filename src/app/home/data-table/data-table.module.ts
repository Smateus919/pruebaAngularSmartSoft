import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTableRoutingModule } from './data-table-routing.module';
import { DataTableComponent } from './data-table.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { MaterialModule } from "./../../common/material/material.module";
import { CreatePatientFormComponent } from './create-patient-form/create-patient-form.component';
import { UpdatePatienteFormComponent } from './update-patiente-form/update-patiente-form.component';


@NgModule({
  declarations: [DataTableComponent, CreatePatientFormComponent, UpdatePatienteFormComponent],
  imports: [
    CommonModule,
    DataTableRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DataTableModule { }
