import { Component, OnInit, ViewChild } from '@angular/core';


// Importamos la tabla donde nos mostrará la información
import { MatTable, MatTableDataSource } from '@angular/material/table';
// Paginación dentro de nuestra tabla
import { MatPaginator } from '@angular/material/paginator';
// Importamos lo que necesitaremos para trabajar con los formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importación para trabajar con los formatos de las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
// Importación para poder trabajar con las fechas
import moment from 'moment';
//Libreria para poder exportar a excel
import * as XLSX from "xlsx"
//Importamos nuestra interfaz
import { Report } from '../../../../Interfaces/report';
//Importmos nuestro servicio
import { SaleService } from '../../../../Services/sale.service';
import { UtilityAlertsService } from '../../../../Reusable/utility-alerts.service';

// CONFIGURAMOS EL FORMATO DE LAS FECHAS QUE VAMOS A TRABAJAR
export const MY_DATA_FORMATS = {
  parse: {
    // Estilo de formato de fecha
    dateInput: 'DD/MM/YYYY'
  },
  // Para poder mostrar, como recibir la fecha
  display: {
    dateInput: 'DD/MM/YYYY',
    // El texto el cual queremos que se muestre en el calendario
    monthYearLabel: 'MMMMM YYYY'
  }
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  // Agregamos un proveedor
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }
  ]
})



export class ReportComponent implements OnInit {

  //Creamos nuestras variables

  //formulario filtro
  formFilter: FormGroup;
  //lista de venta reporte
  listSaleReport: Report[] = [];

  //Empezamos a definir las columnas de nuestra tabla fecha de registro, numero de venta, tipo de pago, total, producto, cantidad, precio y totalProducto
  columnTablesReport: string[] = ["dateRegistration", "numberSale", "paymentType", "total", "product", "amount", "price", "totalProduct"];
  //data venta reporte
  dataSaleReport = new MatTableDataSource(this.listSaleReport);//Establecemos nuestra lista ventas reporte

  //Creamos variable para la paginacion
  // Paginación tabla
  @ViewChild(MatPaginator) paginationTable!: MatPaginator;



  constructor(
    // Inyección de dependencias
    private fb: FormBuilder,
    private _saleService: SaleService,
    private _utilityService: UtilityAlertsService
  ) {
    //Establecemos todos los campos que tendra nuestro formulario
    // Personalizamos los campos que tendrá nuestro formulario
    this.formFilter = this.fb.group({
      // Fecha de inicio
      dateInit: ['', Validators.required],
      // Fecha de fin
      dateEnd: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    /*Emmpty */
  }


  // Aquí simplemente creamos nuestra paginación
  ngAfterViewInit(): void {
    this.dataSaleReport.paginator = this.paginationTable;
  }

  //Creamos el metodo de busqueda segun el rango de fecha especificado
  searchSalesReport() {
    const _dateInit = moment(this.formFilter.value.dateInit).format('DD/MM/YYYY');
    const _dateEnd = moment(this.formFilter.value.dateEnd).format('DD/MM/YYYY');

    //Validacion si esque las fechas que estamos ingresando son validas o no.
    if (_dateInit === "Invalid Date" || _dateEnd === "Invalid Date") {
      // Le dirá que ingrese una fecha correcta
      // "Debe ingresar ambas fechas"
      this._utilityService.showAlerts("You must enter both dates", "Error");
      return;
    }

    //Ejecutamos el servicio para obtener el reporte
    this._saleService.report(
      _dateInit,
      _dateEnd
    ).//Nos subscribimos para obtener la informacion
      subscribe({
        next: (datas) => {
          //Si datas es verdadero entonces--
          if(datas.status){
            ///Actualizamos nuestra lista de venta reporte con informacion que traemos desde la api
            this.listSaleReport = datas.value;
            //Luego actualizamos el origen de nuestra tabla
            this.dataSaleReport.data = datas.value;
          }else{
            //Caso contrario pasara vacio      
              this.listSaleReport = [];
              this.dataSaleReport.data = [];
              //Mensaje de no se encontraron datoos
              this._utilityService.showAlerts("No found datas!!", "Error!!")
          }
        },error: (e)=> {}//Mandara errror
      })
  }


  //Metodo para exportar en excel atraves de un array
  exportExcel(){
    //Creamos constantes
    //Esta crea el libro "ws"
    const book = XLSX.utils.book_new();
    //Esta crea la hoja "ws"
    const  page = XLSX.utils.json_to_sheet(this.listSaleReport);
    //Llamamos nuestra hoja y nuestro libro y el nombre
    XLSX.utils.book_append_sheet(book, page,"Report");
    //Creamos el como se va descargar el archivo excel, el libro y el nombre que se pondra
    XLSX.writeFile(book, "You Report Sales.xlsx");


  }


}
