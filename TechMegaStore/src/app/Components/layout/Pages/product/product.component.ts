import { Component, OnInit } from '@angular/core';
// importamos todos los recursos necesarios

// Importamos el evento termine de renderizarse
import { AfterViewInit } from '@angular/core';
// Importamos para que nos permita hacer la instancia de algun componente que tengamos dentro de nuestro html
import { ViewChild } from '@angular/core';
// Importamos Los recursos para nuestras tablas

// Importamos la tabla donde nos mostrara la informacion de nuestros usuarios
import { MatTable, MatTableDataSource } from '@angular/material/table';
// Paginacion dentro de nuestra tabla
import { MatPaginator } from '@angular/material/paginator';
// Importamos para poder trabajar con los modales
import { MatDialog } from '@angular/material/dialog';

// Importamos nuestro modal producto
import { ModalProductComponent } from '../../Modals/modal-product/modal-product.component';
// Importamos nuestra interfaz de usuarproductoio
import { Product } from '../../../../Interfaces/product';
// Importamos nuestro servicio de producto
import { ProductService } from '../../../../Services/product.service';
// Importamos nuestro servicio de utilidad
import { UtilityAlertsService } from '../../../../Reusable/utility-alerts.service';
// Importamos para que nos permita mostrar alertar personalizadas
import Swal from 'sweetalert2';
import { ModalUserComponent } from '../../Modals/modal-user/modal-user.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit {

  // Implementamos nuestras variables 

  // columnas que tendran nuestras tablas, con un array de string

  columnTables: string[] = ['name', 'category', 'stock', 'price', 'active', 'acciones'];
  // variable que contendra toda la data de los usuarios
  dataInit: Product[] = [];
  //Variable que contendra una lista de productos
  dataListProduct = new MatTableDataSource(this.dataInit);
  //Creamos una instancia de lo que viene ser el matPaginator
  //Esta variable "paginationTable!" va a omitir que sea un valor nulo 
  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    //Dentro de este constructor ponemos todas las dependencias
    //Para mostrar los modales
    private dialog: MatDialog,
    //Inyeccioin de nuestro servicio
    private _productService: ProductService,
    //Hciendo referencia a utilidad service
    private _utilityAlertService: UtilityAlertsService
  ) { }


  //Metodo para obtener productos
  obtainProducts() {
    //Obtenemos todos los usuarios, solo con subscribe podremos obtener la informacion
    this._productService.listProducts().subscribe({
      next: (datas) => {
        //Si es igual a true, rellenara nuestra lista de usuarios
        if (datas.status)
          this.dataListProduct.data = datas.value;
        else {
          //Caso contrario mostrara alerta de "No Se Encontraron Datos"
          this._utilityAlertService.showAlerts("No Data Found", "Error Opps!");
        }
      },
      //En caso de error 
      error: (errors) => { }
    });

  }
  //Dentro de este evento pegamo
  ngOnInit(): void {
   this.obtainProducts()

  }


   //Aqui simplemente creamos nuestra paginacion
   ngAfterViewInit(): void {
    this.dataListProduct.paginator = this.paginationTable;
  }


   //Este metodo nos permitira crear un filtro al realizar datos en nuestra tabla
  //Pasamos el parametro de un evento
  applyFilterTable(event: Event) {
    //Logica para obtener el valor que estamos ingresando
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListProduct.filter = filterValue.trim().toLocaleLowerCase();
  }

  //Metodo para abrir el modal  cuando el producto  es para crear
  newProduct() {
    this.dialog.open(ModalProductComponent, {
      disableClose: true//Evitara que cierre elmodal aunque el usuario de click fuera del modal
    })
      //Esperara la respuesta del modal
      .afterClosed().subscribe(result => {

        //Validamos si esque nuestro resultado es igual a nuestro texto true, ejecutara elmetodo de obtener productos
        if (result == "true") this.obtainProducts();
      });
  }

   //Metodo que nos permitira Editar un Producto
   editProduct(product: Product) {
    this.dialog.open(ModalProductComponent, {
      disableClose: true,//Evitara que cierre elmodal aunque el usuario de click fuera del modal
      data: product //Atraves del data recibira informacion
    })
      //Esperara la respuesta del modal
      .afterClosed().subscribe(result => {
        //Validamos si esque nuestro resultado es igual a nuestro texto true, ejecutara elmetodo de obtener productos
        if (result == "true") this.obtainProducts();
      });
  }



  //Metodo que nos permitira Eliminar un Producto
  deleteProduct(product: Product) {

    //Mostrar un mensaje de alerta para confirmar si borrar
    Swal.fire({
      //Lo que tendra nuestra alerta
      title: '¿Are you sure to delete the Product? ', //Estas seguro de eliminar el Producto?
      text: product.name,
      icon: "warning",
      iconColor: '#3085d6',
      confirmButtonText: "Yes, Delete",
      //En caso de cancelar con el boton cancelar
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, I want to return' //Quiero volver
    }).then((result) =>{ //Configuramos el resultado
      //Condicional, si devulve un true quiere decir que he presionado el boton de confirmar
      if (result.isConfirmed) {
      //Logica en caso de haber presionado en confirmar
      this._productService.deleteProduct(product.idProduct).subscribe({
        next: (datas) => {
          //Logica para status
          if (datas.status) {
            //Alerta Product eliminado exitosamente
            this._utilityAlertService.showAlerts("Product delete", "SucessFull");
            //Despues llamamos la lista de usuarios con cambios actualizados
            this.obtainProducts();
          } else {
            //Caso contrario No se pudo eliminar el Product
            this._utilityAlertService.showAlerts("The Product could not be deleted", "Error!!");
          }
        },
          error: (error) => { }
        });
      }
    });
  }
}
