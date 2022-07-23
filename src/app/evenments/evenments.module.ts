import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvenmentsPageRoutingModule } from './evenments-routing.module';

import { EvenmentsPage } from './evenments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvenmentsPageRoutingModule
  ],
  declarations: [EvenmentsPage]
})
export class EvenmentsPageModule {}
