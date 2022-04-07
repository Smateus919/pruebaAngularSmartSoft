import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { Patient } from 'src/app/interfaces/patients.type';
import { DataTableService } from 'src/app/services/data-table.service';

@Component({
  selector: 'app-update-patiente-form',
  templateUrl: './update-patiente-form.component.html',
  styleUrls: ['./update-patiente-form.component.scss']
})
export class UpdatePatienteFormComponent implements OnInit {

  public patient: Patient
  public formPatient: FormGroup
  public dialogState:string = 'update'
  public typeOper:string = 'Actualizado'


  constructor(
    private dataTableService: DataTableService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.dataTableService.patient$.subscribe(patient => {
      this.patient = patient
      this.buildForm()
    })
  }

  ngOnInit(): void {
    this.formPatient.patchValue(this.patient)

  }

  private buildForm(){
    this.formPatient = this.formBuilder.group({
      name: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      age: ['', [Validators.required]],
      eps: ['', [Validators.required]],
    })
  }
  updatePatient(){
    if (this.formPatient.valid) {
      const value = this.formPatient.value
      this.dataTableService.updatePatient(value)
      .subscribe(data => {
        this.dialogState = 'Successful'
      })
    }
  }
  deleteRecord(){
    console.log('Todo OK');
    this.dialogState = 'confirmDeletion'
    this.typeOper = 'Eliminado'
  }
  confirDelete(){
    this.dataTableService.deletePatient()
    .subscribe(data => {
    })
    this.dialogState = 'Successful'
  }

}
