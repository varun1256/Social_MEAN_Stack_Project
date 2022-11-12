import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { FriendsListComponent } from './friends-list/friends-list.component';

const routes: Routes = [
  {path:'friends/list',component:FriendsListComponent,canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
