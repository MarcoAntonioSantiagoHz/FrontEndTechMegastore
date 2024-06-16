import { Component, OnInit } from '@angular/core';

//Importacion para poder redireccionarnos entre paginas
import { Router } from '@angular/router';
//Importamos nuestra interfaz de menu
import { Menu } from '../../Interfaces/menu';
//Importamos nuestros servicios
import { MenuService } from '../../Services/menu.service';
import { UtilityAlertsService } from '../../Reusable/utility-alerts.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {


  //Creamos nuestras variables

  //Variable para traer la lista de menus
  listMenu: Menu[] = [];
  //Servira para pintar la informacion que traera
  emailUser: String = '';
  roleUser: string = '';

  constructor(
    //Inyeccion de dependencias
    private router: Router,
    private _menuService: MenuService,
    private _utilityService: UtilityAlertsService
  ) { }


  ngOnInit(): void {
    //Obtendremos la informacion de nuestro usuario

    const user = this._utilityService.getSesionUser();
    //validamos si nuestro usuario tiene un valor
    if(user != null){
      //seteamos los valores para nuestro usuario
      this.emailUser = user.email;
      this.roleUser = user.roleDescription;

      //ejecutamos para obtener la lista de menus
      //y le pasaremos solo el idUsuario
      this._menuService.listMenu(user.idUser).subscribe({
        next: (datas) =>{
        //Validamos si en verdad tenemos una respuesta exitosa para poder setear los valores en nuestra lista menu
        if(datas.status) this.listMenu = datas.value;

        },
        error: (e) => {}
      })
    }
  }

  //Metodo para poder cerrar sesion
  closeSession(){
    this._utilityService.deleteSesionUser();
    this.router.navigate(['login']);
  }

}
