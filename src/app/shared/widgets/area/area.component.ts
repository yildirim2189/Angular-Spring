import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Router } from '@angular/router';
import { Chart } from 'src/app/modules/dashboard/dashboard.component';

declare var require: any;

let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit, AfterViewInit {


    chartOptions: any;
    @Input() data = [];
    id: string;
    @Input('chart') chart: Chart;
    curChart;

    Highcharts = Highcharts;

    update(chartTitle){
        console.log(this.chart.id + 'TEST')
        this.chartOptions.series =  [{
            name: 'XXX',
            data: [2502, 635, 809, 947, 22, 55]
        }];
        this.chartOptions.title.text = chartTitle;
        this.chartOptions.subtitle.text = chartTitle;
        this.chartOptions.xAxis.categories = ['a','b','c','d','ee','f']
        Highcharts.chart(this.id, this.chartOptions)
        
    }
    constructor(private router: Router) { }
    ngAfterViewInit(): void {
    this.chartOptions = {
        
        chart: {
            type: 'area'
        },
        title: {
            text: this.chart.title // Title eklendi !
        },
        subtitle: {
            text: this.chart.subtitle // Subtitle eklendi
        },
        xAxis: {
            type: 'datetime',
            categories: this.chart.xAxis.categories, 
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: this.chart.yAxis.title.text
            },
            /*labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }*/
        },
        tooltip: {
            split: false,
            valueSuffix: ' millions'
        },
        credits: {
            // Sağ alttaki Highchart yazısı
            enabled: false,
            // text: 'EHEHE'
        },
        exporting: {
            // Download, print vs optionları
            enabled: true,
        },
        /*
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },*/
        series: this.chart.series
    };

    this.curChart = Highcharts.chart(this.id, this.chartOptions)

    HC_exporting(Highcharts);

    setTimeout( () => {
      window.dispatchEvent(new Event('resize'));
      this.curChart.setTitle({text: 'ABABABA'})
      //this.curChart.redraw();
    }, .300);
    }
    

    ngOnInit() {
        // Convert to string
        this.id = this.chart.id + '';
        console.log(this.id + ' TEST');
        
    }
}