import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  {path:'request/list',component:RequestListComponent,canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
