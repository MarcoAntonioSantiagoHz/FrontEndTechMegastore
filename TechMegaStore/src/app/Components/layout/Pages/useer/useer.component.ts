import { Component, OnInit, viewChild, } from '@angular/core';
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
// Importamos nuestro modal usuario
import { ModalUserComponent } from '../../Modals/modal-user/modal-user.component';
// Importamos nuestra interfaz de usuario
import { Useer } from '../../../../Interfaces/useer';
// Importamos nuestro servicio de usuario
import { UseerService } from '../../../../Services/useer.service';
// Importamos nuestro servicio de utilidad
import { UtilityAlertsService } from '../../../../Reusable/utility-alerts.service';
// Importamos para que nos permita mostrar alertar personalizadas
import Swal from 'sweetalert2';





@Component({
  selector: 'app-useer',
  templateUrl: './useer.component.html',
  styleUrl: './useer.component.css'
})
// implentamos un evento AfterViewInit
export class UseerComponent implements OnInit, AfterViewInit {


  // Implementamos nuestras variables

  // columnas que tendran nuestras tablas, con un array de string
 
  columnTables: string[] = ['completeName', 'email', 'roleDescription', 'active', 'acciones'];
  // variable que contendra toda la data de los usuarios
  dataInit: Useer[] = [];
  //Variable que contendra una lista de usuarios
  dataListUseers = new MatTableDataSource(this.dataInit);
  //Creamos una instancia de lo que viene ser el matPaginator
  //Esta variable "paginationTable!" va a omitir que sea un valor nulo 
  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    //Dentro de este constructor ponemos todas las dependencias
    //Para mostrar los modales
    private dialog: MatDialog,
    //Inyeccioin de nuestro servicio
    private _userService: UseerService,
    //Hciendo referencia a utilidad service
    private _utilityAlertService: UtilityAlertsService
  ) { }




  //Metodo para obtener usuarios
  obtainUsers() {
    //Obtenemos todos los usuarios, solo con subscribe podremos obtener la informacion
    this._userService.listUsers().subscribe({
      next: (datas) => {
        //Si es igual a true, rellenara nuestra lista de usuarios
        if (datas.status)
          this.dataListUseers.data = datas.value;
        else {
          //Caso contrario mostrara alerta de "No Se Encontraron Datos"
          this._utilityAlertService.showAlerts("No Data Found", "Error Opps!");
        }
      },
      //En caso de error 
      error: (errors) => { }
    });

  }


  //Dentro de este evento
  ngOnInit(): void {
    this.obtainUsers();

  }


  //Aqui simplemente creamos nuestra paginacion
  ngAfterViewInit(): void {
    this.dataListUseers.paginator = this.paginationTable;
  }

  //Este metodo nos permitira crear un filtro al realizar datos en nuestra tabla
  //Pasamos el parametro de un evento
  applyFilterTable(event: Event) {
    //Logica para obtener el valor que estamos ingresando
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListUseers.filter = filterValue.trim().toLocaleLowerCase();
  }

  //Metodo para abrir el modal  cuando el usuario va dar para crear
  newUseer() {
    this.dialog.open(ModalUserComponent, {
      disableClose: true//Evitara que cierre elmodal aunque el usuario de click fuera del modal
    })
      //Esperara la respuesta del modal
      .afterClosed().subscribe(result => {

        //Validamos si esque nuestro resultado es igual a nuestro texto true, ejecutara elmetodo de obtener usuarios
        if (result == "true") this.obtainUsers();
      });
  }

  //Metodo que nos permitira Editar un Usuario
  editUseer(useer: Useer) {
    this.dialog.open(ModalUserComponent, {
      disableClose: true,//Evitara que cierre elmodal aunque el usuario de click fuera del modal
      data: useer //Atraves del data recibira informacion
    })
      //Esperara la respuesta del modal
      .afterClosed().subscribe(result => {
        //Validamos si esque nuestro resultado es igual a nuestro texto true, ejecutara elmetodo de obtener usuarios
        if (result == "true") this.obtainUsers();
      });
  }


  //Metodo que nos permitira Eliminar un Usuario
  deleteUseer(useer: Useer) {

    //Mostrar un mensaje de alerta para confirmar si borrar
    Swal.fire({
      //Lo que tendra nuestra alerta
      title: '¿Are you sure to delete the user? ', //Estas seguro de eliminar el usuario?
      text: useer.completeName,
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
      this._userService.deleteUseer(useer.idUser).subscribe({
        next: (datas) => {
          //Logica para status
          if (datas.status) {
            //Alerta usuarios eliminado exitosamente
            this._utilityAlertService.showAlerts("User delete", "SucessFull");
            //Despues llamamos la lista de usuarios con cambios actualizados
            this.obtainUsers();
          } else {
            //Caso contrario No se pudo eliminar el usuario
            this._utilityAlertService.showAlerts("The user could not be deleted", "Error!!");
          }
        },
          error: (error) => { }
        });
      }
    });
  }
}






