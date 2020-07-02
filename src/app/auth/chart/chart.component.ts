import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Subscription } from 'rxjs';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  subscription: Subscription;
  users: any = [];
  chartOption: EChartOption = {};
  constructor(private ngxService: NgxUiLoaderService, private userService: UserService) { }

  ngOnInit() {
    this.ngxService.startLoader('loader-chart'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    this.subscription = this.userService.getData().subscribe(data => {
      const xAxis = [];
      const yAxis = [];
      let d: number;
      data.map(user => {
        d = new Date(user.dob).getFullYear();
        if (!isNaN(d)) {
          xAxis.push(user.userName);
          yAxis.push(d);
        }
      });
      this.chartOption = {
        legend: {},
        tooltip: {
          trigger: 'axis'
        },
        grid: { containLabel: true },
        title: {
          show: true,
          text: 'User - Year Of Birth'
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: yAxis,
            type: 'scatter',
            markPoint: {
              data: [
                {
                    name: 'maximum',
                    type: 'max'
                },
                {
                  name: 'minimum',
                  type: 'min'
                },
                {
                  name: 'average',
                  type: 'average'
                }
              ]
            }
          }
        ]
      };
      this.ngxService.stopLoader('loader-chart'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    });
  }
}
