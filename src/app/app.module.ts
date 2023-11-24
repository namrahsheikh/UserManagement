import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersTableModule } from '../app/users-table/users-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UsersTableService } from './users-table/services/users-table.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersTableModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [UsersTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
