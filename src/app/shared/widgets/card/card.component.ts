import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;
  @Input() data = [];

  Highcharts = Highcharts;
  chartOptions = {};

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      chart: {
          type: 'area',
          backgroundColor: null,
          borderWidth: 0,
          margin: [2,2,2,2],
          height: 60
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      
      xAxis: {
        //  categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        //  tickmarkPlacement: 'on',
        //  title: {
        //      enabled: false
        //  }
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: []
      },
      yAxis: {
          /*title: {
              text: 'Billions'
          },
          labels: {
              formatter: function () {
                  return this.value / 1000;
              }
          },*/
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickOptions: []
      },
      tooltip: {
          split: true,
          // valueSuffix: ' millions'
          outside: true
      },
      legend: {
        enabled: false
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false,
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
      series: [{
        data: this.data
      }]
    };
    HC_exporting(this.Highcharts);

    setTimeout( () => {
      window.dispatchEvent(new Event('resize'));
    }, .350);
  }

}
