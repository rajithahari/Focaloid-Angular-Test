import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import { AngularMaterialModule } from '../angular-material.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';

import { AgePipe } from '../pipes/age.pipe';

@NgModule({
  declarations: [
    UserComponent,
    UserListingComponent,
    UserSelectionComponent,
    AgePipe
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    UserRoutingModule,
    AngularMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {}
