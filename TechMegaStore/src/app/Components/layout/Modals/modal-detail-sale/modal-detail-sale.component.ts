import { Component, OnInit } from '@angular/core';



//Importamos el Inject que nos permitira recibir dede otro componente hasta cualquier informacion que le estemos pasando
import { Inject } from '@angular/core';
//Importamos la forma de obtener datos atraves de los modales
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//Importamos nuestros servicios
import { Sale } from '../../../../Interfaces/sale';
import { SaleDetail } from '../../../../Interfaces/sale-detail';




@Component({
  selector: 'app-modal-detail-sale',
  templateUrl: './modal-detail-sale.component.html',
  styleUrl: './modal-detail-sale.component.css'
})
export class ModalDetailSaleComponent implements OnInit {

  //Creamos nuestras variables

  //Variable fecha de registro detipo string y vacio
  dateRegistration: string = "";
  //Variable numero de documento
  documentNumber: string = "";
  //Variable tipo de pago
  paymentType: string = "";
  //total
  total: string = "";
  //detalle venta
  saleDetails: SaleDetail[] = [];

  //Creamos las columnas de nuestra tabla donde mostrara los productos
  columnTable = ['product', 'amount', 'price', 'total']
  constructor(
    //Inyectamos dependencias para obtener datos
    //Inyectamos el componente para recibir los datos, sale = venta
    @Inject(MAT_DIALOG_DATA) public _sale: Sale,) {
    //con la informacion recibida seteamos las variables con sus respectivos valores
    this.dateRegistration = _sale.dateRegistration!;
    this.documentNumber = _sale.documentNumber!;
    this.paymentType = _sale.paymentType;
    this.total = _sale.saleTotalText
    this.saleDetails = _sale.saleDetails;


  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
