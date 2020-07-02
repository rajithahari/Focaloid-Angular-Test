import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';

import { AdministratorComponent } from './administrator/administrator.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [ChartComponent, AdministratorComponent],
  imports: [
    RouterModule.forRoot([]),
    AuthRoutingModule,
    CommonModule,
    AngularMaterialModule,
    NgxUiLoaderModule,
    NgxEchartsModule.forRoot({
      echarts
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}

