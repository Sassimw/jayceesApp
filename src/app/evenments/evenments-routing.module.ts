import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvenmentsPage } from './evenments.page';

const routes: Routes = [
  {
    path: '',
    component: EvenmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvenmentsPageRoutingModule {}
