import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UsersTableService } from './services/users-table.service';
import { UsersTableInterface } from './users-table.interface';
import {animate,state, style,transition,trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  animations: [
    trigger('detailExpand',[
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collpsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersTableComponent implements OnInit {

  displayedColumns:string[] = ['id','firstName','lastName'];
  dataSource = new MatTableDataSource<UsersTableInterface>();
  isLoading:boolean = false;
  userForm:FormGroup;


  

  constructor(private userTableService : UsersTableService, public _changeDetRef:ChangeDetectorRef,private _fb:FormBuilder) {
    this.userForm = this._fb.group({
      id:'',
      firstName:'',
      lastName:''

    })
   }

  ngOnInit(): void {
    this.userTableService.fetchUSers().subscribe((res)=>{
      
      console.log(res);
      this.dataSource.data=res;

    })
  }
  toggleRow(element:any){
   element.expanded = !element.expanded;
   this.userForm.controls['id'].setValue(element.id);
   this.userForm.controls['firstName'].setValue(element.firstName);
   this.userForm.controls['lastName'].setValue(element.lastName);
    // this._changeDetRef.detectChanges();
  }

  updateUser(){
    this.isLoading = true;
   const user={
      'id' : this.userForm.controls['id'].value,
      'firstName':this.userForm.controls['firstName'].value,
      'lastName':this.userForm.controls['lastName'].value,
    }
    this.userTableService.updateUser(user).subscribe((res)=>{
      console.log(res)
      this.isLoading = false;
      this._changeDetRef.detectChanges();

      
    })
  }

}
