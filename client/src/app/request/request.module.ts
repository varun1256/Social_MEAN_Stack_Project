import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    RequestListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
