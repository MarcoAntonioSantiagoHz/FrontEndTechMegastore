import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// Importamos la tabla donde nos mostrará la información
import { MatTable, MatTableDataSource } from '@angular/material/table';
// Paginación dentro de nuestra tabla
import { MatPaginator } from '@angular/material/paginator';
// Importamos para poder trabajar con los modales
import { MatDialog } from '@angular/material/dialog';
// Importamos lo que necesitaremos para trabajar con los formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importación para trabajar con los formatos de las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
// Importación para poder trabajar con las fechas
import moment from 'moment';
// Importamos nuestro modal de venta
import { ModalDetailSaleComponent } from '../../Modals/modal-detail-sale/modal-detail-sale.component';
// Importamos nuestros servicios y ventas
import { Sale } from '../../../../Interfaces/sale';
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
  selector: 'app-history-sale',
  templateUrl: './history-sale.component.html',
  styleUrls: ['./history-sale.component.css'], // Corrected from styleUrl to styleUrls
  // Agregamos un proveedor
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }
  ]
})
export class HistorySaleComponent implements OnInit, AfterViewInit {

  // Creamos nuestro formulario de búsqueda
  formSearch: FormGroup;
  // Variables de búsqueda
  //opciones busqueda
  optionsSearch: any[] = [

    { value: "date", description: "Por fechas" },
    { value: "number", description: "Numero Venta" }
  ]
  columnTable: string[] = ['dateRegistration', 'documentNumber', 'paymentType', 'total', 'accion']
  //data inicio
  dateInit: Sale[] = [];
  // Datos lista venta
  dataSalesList = new MatTableDataSource(this.dateInit);
  // Paginación tabla
  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    // Inyección de dependencias
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _saleService: SaleService,
    private _utilityService: UtilityAlertsService
  ) {
    // Personalizamos los campos que tendrá nuestro formulario
    this.formSearch = this.fb.group({
      // Buscar por fecha
      searchFor: ['fecha'],
      // Número
      number: [''],
      // Fecha de inicio
      dateInit: [''],
      // Fecha de fin
      dateEnd: ['']
    })

    // Creamos el evento para cuando cambia buscar por..
    this.formSearch.get("searchFor")?.valueChanges.subscribe(value => {
      this.formSearch.patchValue({
        // Número
        number: "",
        // Fecha de inicio
        dateInit: "",
        // Fecha de fin
        dateEnd: ""
      })
    })
  }

  ngOnInit(): void {
    // Implementación necesaria si la hay
  }

  // Aquí simplemente creamos nuestra paginación
  ngAfterViewInit(): void {
    this.dataSalesList.paginator = this.paginationTable;
  }

  // Este método nos permitirá crear un filtro al realizar datos en nuestra tabla
  // Pasamos el parámetro de un evento
  applyFilterTable(event: Event) {
    // Lógica para obtener el valor que estamos ingresando
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSalesList.filter = filterValue.trim().toLocaleLowerCase();
  }

  // Creamos el método "buscar ventas" para la lógica si el usuario busca por fecha o por número de venta le aparecerá según sea la búsqueda
  searchSales() {
    // Creamos 2 variables que empezarán de forma vacía, fecha de inicio y fecha fin
    let _dateInit: string = "";
    let _dateEnd: string = "";

    // Creamos lógica para la validación cuando es por filtro de fecha y cuando no
    // Si es igual a valor de fecha es un rango de fechas
    if (this.formSearch.value.searchFor === "date") {
      _dateInit = moment(this.formSearch.value.dateInit).format('DD/MM/YYYY');
      _dateEnd = moment(this.formSearch.value.dateEnd).format('DD/MM/YYYY');

      // Validamos si son fechas inválidas
      if (_dateInit === "Invalid Date" || _dateEnd === "Invalid Date") {
        // Le dirá que ingrese una fecha correcta
        // "Debe ingresar ambas fechas"
        this._utilityService.showAlerts("You must enter both dates", "Error");
        return;
      }
    }

    //Ejecutamos nuestro servicio
    this._saleService.history(
      this.formSearch.value.searchFor,
      this.formSearch.value.number,
      _dateInit,
      _dateEnd
    )//Nos subscribimos para tener la respuesta de nuestra api
    .subscribe({
      next:(data) => {

        //Validamos la respuesta de nuestra API, si es igual a true
        if(data.status){
          this.dataSalesList = data.value;
        }else{
          //Mensajke No se encontraron datos
          this._utilityService.showAlerts("No No data found", "Error!");
        }
      
      },
        //En caso de error
        error: (error) => {}
    });
  }


  //Metodo para poder visualizar una venta
  //ver detalle venta
  showDetailSale(_sale: Sale){
    //Abrimos el modal

    this.dialog.open(ModalDetailSaleComponent,{
      //Personalizamos el diseño de como se abrira
      data: _sale,
      //Restringir que no se cierre el modal cada vez que presione fuera del modal
      disableClose: true,
      //Establece el ancho del modal
      width: '700px'
    });
  }
}
