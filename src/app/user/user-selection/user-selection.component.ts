import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';

import { AgePipe } from '../../pipes/age.pipe';

export interface PeriodicElement {
  userName: string;
  age: number;
  phoneNumber: number;
}
@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css'],
  providers: [AgePipe]
})
export class UserSelectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  users: any = [];
  displayedColumns: string[] = ['User Name', 'Age', 'Phone Number'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private ngxService: NgxUiLoaderService, private userService: UserService) {}

  ngOnInit() {
    this.ngxService.startLoader('loader-02'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    this.subscription = this.userService.getData().subscribe(data => {
      this.users = new MatTableDataSource<PeriodicElement>(data.filter(user => user.selected));
      this.users.paginator = this.paginator;
      this.ngxService.stopLoader('loader-02'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
