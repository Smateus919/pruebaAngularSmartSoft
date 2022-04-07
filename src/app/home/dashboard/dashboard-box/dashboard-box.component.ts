import { Component, Input, OnInit, AfterContentInit } from "@angular/core";
import { Patient } from "src/app/interfaces/patients.type";
import { DashboardItem } from "../../../interfaces/dashboard.item.type";
import { DashboardComponent } from "../dashboard.component";
import { DataTableService } from "../../../services/data-table.service";

@Component({
  selector: "app-dashboard-box",
  templateUrl: "./dashboard-box.component.html",
  styleUrls: ["./dashboard-box.component.css"],
})
export class DashboardBoxComponent implements OnInit {
  @Input() public data: DashboardItem;
  @Input() public dataPatient: Patient[]
  @Input() public index: number
  @Input() public mainRef: DashboardComponent;
  public expanded = false;

  constructor(
    private dataTableService: DataTableService
  ) {}

  public ngOnInit(): void {
    console.log(this.index);
    console.log('Ok',this.dataPatient, this.data);
  }


  /**
   * changePanel
   */
  public changePanel() {
    this.expanded = !this.expanded;
  }
}
