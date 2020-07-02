import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Users} from '../../assets/users.json';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}
  data = Users;
  users = new BehaviorSubject<any>(this.data);
  getData(): Observable<any> {
    return this.users.asObservable();
  }
  setData(data) {
    this.users.next(data);
  }
}
