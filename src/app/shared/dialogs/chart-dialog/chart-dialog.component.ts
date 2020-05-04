import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { DialogData } from '../dialog/dialog.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'src/app/modules/dashboard/dashboard.component';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  newSerie =  { name: '', data: [] }
  
  chart: Chart = {
    id: 0,
    title: null,
    subtitle: null,
    description: null,
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: null
      }
    },
    series: []
  };

  selectedSerie = this.newSerie;

  constructor(public dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    
  }


  onClick(){
    this.dialogRef.close(
      this.chart
    );
  }

  onNoClick(){
    this.dialogRef.close();
  }

  addXAxisCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add category
    if ((value || '').trim()) {
      this.chart.xAxis.categories.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeXAxisCategory(category): void {
    const index = this.chart.xAxis.categories.indexOf(category);
    if (index >= 0) {
      this.chart.xAxis.categories.splice(index, 1);
    }
  }

  addSerieData(event: MatChipInputEvent){
    const input = event.input;
    const value = event.value;
    console.log(event);
    // Number kontrolü gelmesi lazım
    if ((value || '').trim()) {
      let num = parseInt(value.trim());
      this.selectedSerie.data.push(num);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeSerieData(data){
    const index = this.selectedSerie.data.indexOf(data);
    if(index >= 0){
      this.selectedSerie.data.splice(index, 1);
    }
  }

  removeSerie(data): void {
    console.log(data)
    const index = this.chart.series.indexOf(data);
    console.log(index)
    if (index >= 0) {
      this.chart.series.splice(index, 1);
    }
  }

  selectChip(s){
    // To do verimli hale getir.
    if(this.selectedSerie === s){
      this.selectedSerie = this.newSerie;
    }else{
      const index = this.chart.series.indexOf(s);
      if(index >= 0){
        this.selectedSerie = s;
      }
    }
  }

  addNewData(){
    this.chart.series.push(this.newSerie);
    this.newSerie = {name: '', data: []};
    this.selectedSerie = this.newSerie;
  }
}
