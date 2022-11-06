import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    RequestListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
