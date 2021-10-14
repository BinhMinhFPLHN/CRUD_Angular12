import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListbookComponent } from './listbook/listbook.component';

const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Listbook', component: ListbookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
