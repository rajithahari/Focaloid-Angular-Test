import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule
    ]
})

export class AngularMaterialModule { }
