import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { UserService } from '../user.service';

import { AgePipe } from '../../pipes/age.pipe';

export interface PeriodicElement {
  userName: string;
  age: number;
  phoneNumber: number;
}

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
  providers: [AgePipe]
})
export class UserListingComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  users: any = [];
  dataSource: any = [];
  displayedColumns: string[] = ['User Name', 'Age', 'Phone Number'];
  options = [{key: 'All Users', value: 0}, {key: 'Age <= 18', value: 1}, {key: 'Age > 18 && <= 56', value: 2}, {key: 'Age > 56', value: 3}];
  selectedOption: any = {};
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private ngxService: NgxUiLoaderService, private userService: UserService, private age: AgePipe) {}

  ngOnInit() {
    this.selectedOption = {key: 'All Users', value: 0};
    this.ngxService.startLoader('loader-01'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    this.subscription = this.userService.getData().subscribe(data => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(data.map(user => {
        user.age = this.age.transform(user.dob);
        return user;
      }));
      this.dataSource.paginator = this.paginator;
      this.users = this.dataSource;
      this.ngxService.stopLoader('loader-01'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    });
  }

  ageFilter(selector) {
    this.ngxService.startLoader('loader-01'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    this.selectedOption = selector;
    this.users = this.dataSource.filteredData.filter(user => {
      if (selector.value === 1 && user.age <= 18) {
        return user;
      } else if (selector.value === 2 && user.age > 18 && user.age <= 56) {
        return user;
      } else if (selector.value === 3 && user.age > 56) {
        return user;
      } else if (selector.value === 0) {
        return user;
      }
    });
    this.users = new MatTableDataSource<PeriodicElement>(this.users);
    this.users.paginator = this.paginator;
    this.ngxService.stopLoader('loader-01'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
  }

  event(row) {
    this.ngxService.startLoader('loader-01'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    const users = this.users.filteredData.map(user => {
      if (user === row) {
        user.selected = user.selected ? false : true;
      }
      return user;
    });
    this.userService.setData(users);
    this.ngxService.stopLoader('loader-01'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
