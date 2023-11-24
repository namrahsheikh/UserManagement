import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject } from 'rxjs';
import { UsersTableInterface } from '../users-table.interface';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsersTableService {


  constructor(private http:HttpClient) { }

  fetchUSers():Observable<UsersTableInterface[]>{
   return this.http.get<UsersTableInterface[]>("https://dummyjson.com/users")
   .pipe<UsersTableInterface[]>(map((data:any)=>data.users))
  }

  updateUser(user:UsersTableInterface):Observable<UsersTableInterface>{
   
    return this.http.patch<UsersTableInterface>("https://dummyjson.com/users/"+`${user.id}`,user)

  }
}
