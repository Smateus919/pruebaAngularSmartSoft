import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'

import { Patient } from "../interfaces/patients.type";

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  size = 0

  API = 'https://obscure-gorge-15307.herokuapp.com/API/v1/'

  private patient = new BehaviorSubject<Patient>({id: 0, name: '', idCard: 0, age: 0, eps: ''})
  patient$ = this.patient.asObservable()
  patients: Patient[]

  private patientsSize = new BehaviorSubject<number>(0)
  patientsSize$ = this.patientsSize.asObservable()

  constructor(
    private http: HttpClient
  ) {
    this.getAllPatients().subscribe(data => {
      this.patientsSize.next(data.length)
    })
  }

  getAllPatients(){
    return this.http.get<Patient[]>(`${this.API}patients`)
  }
  getpatientsSize(){

    this.getAllPatients()
    .subscribe(data => {
      console.log(data.length);
      this.patientsSize.next(data.length)
      this.size = data.length
    })
    console.log(this.patientsSize.value);

    return this.size
  }

  getPartPatients(limit:number, offset:number){
    let params = new HttpParams()
    if (limit) {
      params = params.set('limit', limit.toString())
      params = params.set('offset', offset.toString())
    }
    return this.http.get<Patient[]>(`${this.API}patients`, { params })
  }
  createPatient(data: Patient){
    return this.http.post(`${this.API}patients`, data)
  }

  updatePatient(data:Patient){
    return this.http.patch(`${this.API}patients/${this.patient.value.id.toString()}`, data)
  }
  getPatientUpdate(patientChange: Patient ){
    this.patient.next(patientChange)
  }
  deletePatient(){
    return this.http.delete(`${this.API}patients/${this.patient.value.id.toString()}`)
  }

}
