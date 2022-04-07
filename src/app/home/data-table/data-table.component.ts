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

  loadedData: boolean = false
  pageEvent: PageEvent
  limit: number = 5
  offset: number = 0

  patients: Patient[] = []
  displayedColumns: string[] = ['id', 'name', 'idCard', 'age', 'eps'];
  totalPatientSize: number

  constructor(
    private dataTable: DataTableService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllPatient()
    this.getDataPatientsByPage()
  }
  getAllPatient(){
    this.dataTable.getAllPatients()
    .subscribe(data => {
      this.totalPatientSize = data.length
    })
  }

  getDataPatientsByPage(){
    this.dataTable.getPartPatients(this.limit, this.offset)
    .subscribe(data => {
      this.patients = data.reverse()
      this.offset += this.limit
      this.loadedData = true
    })
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(CreatePatientFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getDataPatientsByPage()
      this.table.renderRows()
    });
  }
  openDialogUpdate(){
    const dialogRef = this.dialog.open(UpdatePatienteFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getDataPatientsByPage()
      this.table.renderRows()
      console.log(`Actualizado`, result);
    });
  }
  setElement(patient){
    this.dataTable.getPatientUpdate(patient)
  }
  changePage(pageEvent: PageEvent){
    if (pageEvent.previousPageIndex < pageEvent.pageIndex) {
      this.dataTable.getPartPatients(this.limit, this.offset)
      .subscribe(data =>{
        this.patients = data
        this.offset += this.limit
      })
    }else{
      this.offset -= this.limit*2
      console.log(this.offset);
      this.dataTable.getPartPatients(this.limit, this.offset)
      .subscribe(data =>{
        this.patients = data
        this.offset += this.limit
      })
    }
  }

}
