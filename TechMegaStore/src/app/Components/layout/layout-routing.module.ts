import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UseerComponent } from './Pages/useer/useer.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { ProductComponent } from './Pages/product/product.component';
import { HistorySaleComponent } from './Pages/history-sale/history-sale.component';
import { ReportComponent } from './Pages/report/report.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    //Para poder visualizar el dashBoard
    { path: 'dashboard', component: DashBoardComponent },
    // Para poder visualizar la pagina de usuarios
    { path: 'useer', component: UseerComponent },
     // Para poder visualizar la pagina de productos
    { path: 'product', component: ProductComponent },
     // Para poder visualizar la pagina de  ventas
    { path: 'sale', component: SaleComponent },
     // Para poder visualizar la pagina de  historial de venta
    { path: 'history_sale', component: HistorySaleComponent },
      // Para poder visualizar la pagina de reportes
      { path: 'report', component: ReportComponent },
  
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
