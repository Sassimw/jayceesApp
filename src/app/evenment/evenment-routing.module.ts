import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvenmentPage } from './evenment.page';

const routes: Routes = [
  {
    path: '',
    component: EvenmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvenmentPageRoutingModule {}
