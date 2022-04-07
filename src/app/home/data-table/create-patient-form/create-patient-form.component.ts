import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { DataTableService } from "./../../../services/data-table.service";

@Component({
  selector: 'app-create-patient-form',
  templateUrl: './create-patient-form.component.html',
  styleUrls: ['./create-patient-form.component.scss']
})
export class CreatePatientFormComponent implements OnInit {

  formPatient: FormGroup
  dialogState: string = 'create'

  constructor(
    private formBuilder: FormBuilder,
    private dataTableService: DataTableService,
    private router: Router
  ) {
    this.buildForm()
   }

  ngOnInit(): void {
  }

  private buildForm(){
    this.formPatient = this.formBuilder.group({
      name: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      age: ['', [Validators.required]],
      eps: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }
  createPatient(event: Event){
    event.preventDefault()
    if (this.formPatient.valid) {
      const value = this.formPatient.value
      this.dataTableService.createPatient(value)
      .subscribe(data => {
        console.log('Paciente creado', data);
        this.dialogState = 'Successful'
      })
    }
  }

}
