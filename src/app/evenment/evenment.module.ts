import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvenmentPageRoutingModule } from './evenment-routing.module';

import { EvenmentPage } from './evenment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvenmentPageRoutingModule
  ],
  declarations: [EvenmentPage]
})
export class EvenmentPageModule {}
