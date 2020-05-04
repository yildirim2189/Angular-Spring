import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AreaComponent } from 'src/app/shared/widgets/area/area.component';
import { ChartDialogComponent } from 'src/app/shared/dialogs/chart-dialog/chart-dialog.component';
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import * as _ from 'lodash';

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Chart{
  id: number;
  title: string;
  subtitle: string;
  description: string;
  series: any[];
  xAxis: {
    categories: string[]
  };
  yAxis: {
    title: {
      text: string;
    }
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  testChart: Chart = {
    id: 2000,
    title: "My Test Title",
    subtitle: "My Test Sub",
    description: "My Test Desc.",
    xAxis: {
      categories: ['Harcama 1', 'Harcama 2', 'Harcama 3', 'Harcama 4', 'Harcama 5']
    },
    yAxis: {
      title: {
        text: 'Y Axis Test Title'
      }
    },
    series: [
      {name: 'Yıldırım', data: [100,300,200,400,250]},
      {name: 'Yavuz', data: [200,350,120,600,150]},
      {name: 'Serpil', data: [500,50,0,400,350]}
    ]
  };

  charts: Chart[] = [this.testChart];
  dataSource: MatTableDataSource<Chart> = new MatTableDataSource<Chart>(this.charts);
  obs: Observable<any>;
  cards = [] = this.dashboardService.cards();
  pie = [] = this.dashboardService.pieChart();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  tableData = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild('tablePaginator', {static: true}) tablePaginator : MatPaginator;
  @ViewChild('chartPaginator', {static: true}) chartPaginator : MatPaginator;
  @ViewChildren('chartX') childrenCharts: QueryList<AreaComponent>;


  constructor(private dashboardService: DashboardService, private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef, private translateService: TranslateService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.chartPaginator;
    this.obs = this.dataSource.connect();
    this.cards = this.dashboardService.cards();
    this.pie = this.dashboardService.pieChart();
    this.tableData.paginator = this.tablePaginator;
  }
  
  changeChartType(event){
  }

  test(){
    let copyChart = { ...this.charts[this.charts.length-1] };
    if(this.charts.length < 1){
      copyChart = this.testChart;
    }
    copyChart.id++;
    this.charts.push(copyChart);
    this.refreshData();
  }

  addChart(){
    let dialogRef = this.dialog.open(ChartDialogComponent,{
      height: '600px',
      width: '600px',
      data: {
        name : this.translateService.instant('chart.add.title')
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data !== undefined){
          let newChart : Chart = {
            id: 500,
            title: data.title,
            subtitle: data.subtitle,
            series: data.series,
            description: data.description,
            xAxis: data.xAxis,
            yAxis: data.yAxis
          }
          // Gelen data pushlandığında chart oto ekleniyor. initleniyor.
          this.charts.push(newChart);
          this.refreshData();
        }
      }
    );
  }

  deleteChart(chartId){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minHeight: '200px',
      minWidth: '350px',
      data: {
        title : this.translateService.instant('chart.delete.title'),
        confirmYesTitle: this.translateService.instant("delete"),
        confirmText: this.translateService.instant("chart.delete.confirmText")
      },
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === true){
          let charto = _.remove(this.charts, chart => {
            return chart.id === chartId;
          });
          // refresh data
          this.refreshData();
          this.openSnackbar(this.translateService.instant("chart.delete.success"))
        }else{
          this.openSnackbar(this.translateService.instant("chart.delete.cancel"))
        }
      }
    )
  }

  openSnackbar(message:string){
    this.snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  refreshData(){
    this.dataSource.data = this.charts;
  }
}
