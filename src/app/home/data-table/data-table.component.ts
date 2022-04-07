import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { CreatePatientFormComponent } from "./create-patient-form/create-patient-form.component";
import { UpdatePatienteFormComponent } from "./update-patiente-form/update-patiente-form.component";

import { DataTableService } from "../../services/data-table.service";
import { Patient } from "../../interfaces/patients.type";
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>

  public loadedData: boolean = false
  public pageEvent: PageEvent
  public page = 1

  public patients: Patient[] = []
  public displayedColumns: string[] = ['id', 'name', 'idCard', 'age', 'eps'];
  public totalPatientSize: number

  constructor(
    private dataTable: DataTableService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllPatient()
  }
  getAllPatient(){
    this.dataTable.getAllPatients()
    .subscribe(data => {
      this.patients = data.reverse()
      this.totalPatientSize = data.length
      this.loadedData = true
    })
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(CreatePatientFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllPatient()
      this.table.renderRows()
    });
  }
  openDialogUpdate(){
    const dialogRef = this.dialog.open(UpdatePatienteFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllPatient()
      this.table.renderRows()
    });
  }
  setElement(patient){
    this.dataTable.getPatientUpdate(patient)
  }

}
