import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UseerComponent } from './Pages/useer/useer.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { HistorySaleComponent } from './Pages/history-sale/history-sale.component';
import { ReportComponent } from './Pages/report/report.component'; 

import { SharedModule } from '../../Reusable/shared/shared.module';
import { ModalUserComponent } from './Modals/modal-user/modal-user.component';
import { ModalProductComponent } from './Modals/modal-product/modal-product.component';
import { ModalDetailSaleComponent } from './Modals/modal-detail-sale/modal-detail-sale.component';
import { HomeComponent } from './Pages/home/home.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    UseerComponent,
    ProductComponent,
    SaleComponent,
    HistorySaleComponent,
    ReportComponent,
    ModalUserComponent,
    ModalProductComponent,
    ModalDetailSaleComponent,
    HomeComponent
  ],  
  imports: [
    //ARRIBA ES LLAMADO Y AQUI ES IMPORTADO
    CommonModule,
    LayoutRoutingModule,
    //Llamamos al modulo
    SharedModule
  ]
})
export class LayoutModule { }
