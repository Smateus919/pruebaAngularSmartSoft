import { Component, Injectable, OnInit } from "@angular/core";
import { Patient } from "src/app/interfaces/patients.type";
import { DashboardItem } from "../../interfaces/dashboard.item.type";
import { DashboardService } from "../../services/dashboard.service";
import { DataTableService } from "../../services/data-table.service";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
@Injectable({
  providedIn: "root",
})
export class DashboardComponent implements OnInit {
  public elements: DashboardItem[] = [];
  public patients: Patient[] = [];
  public lastPatients: Patient[] = [{
    id: 5,
    name: 'sdasdasd',
    idCard: 1351321,
    age: 12,
    eps: 'sdasda'
  }];
  public loading = false;
  public ngxLoadingAnimationTypes = {
    chasingDots: "chasing-dots",
    circle: "sk-circle",
    circleSwish: "circleSwish",
    cubeGrid: "sk-cube-grid",
    doubleBounce: "double-bounce",
    none: "none",
    pulse: "pulse",
    rectangleBounce: "rectangle-bounce",
    rotatingPlane: "rotating-plane",
    threeBounce: "three-bounce",
    wanderingCubes: "wandering-cubes",
  };

  constructor(
    private dashboardService: DashboardService,
    private toast: ToastService,
    private dataTableService: DataTableService
  ) {}


  public ngOnInit() {
    this.getData().then();
    this.getDataPatient()
  }

  /**
   * getMetrics
   */
  public async getData() {
    try {
      this.loading = true;
      this.elements = await this.dashboardService.getNewDashboardData();
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.toast.error(
        "No se pudieron obtener los indicadores del dashboard, revise su conexión"
      );
    }
  }

  public getDataPatient(){
    this.dataTableService.getAllPatients()
    .subscribe(data => {
      this.patients = data.reverse()
      for (let i = 0; i < 3; i++) {
        this.lastPatients[i] = this.patients[i]
      }
    })
  }
}
