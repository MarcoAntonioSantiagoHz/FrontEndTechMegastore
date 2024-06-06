import { Component, OnInit } from '@angular/core';
//Importacion de recursos que utilizaremos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Nos permitira hacer las redirecciones a nuestras paginas
import { Router } from '@angular/router';
//Importamos la interaz de login
import { Login } from '../../Interfaces/login';
//Importamos el servicio de usuario
import { UseerService } from '../../Services/useer.service';
//Importamos nuestro servicio de metodos y alertas
import { UtilityAlertsService } from '../../Reusable/utility-alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //Creamos una variable para nuestro formulario
  formLogin: FormGroup;
  //Creamos una variable para nuestra contraseña y ocultar contraseña
  ocultPassword: boolean = true;
  showLoading: boolean = false;

  //Agregamos todas las dependencias de nuestro constructor
  constructor(
    //Para poder construir los campos de nuestro formulario
    private formBuilder: FormBuilder,
    //Para poder trabajar con los redireccionamientos
    private router: Router,
    //Hacemos referencia a usuarioService
    private _useerService: UseerService,
    //Hacemos el llamado el servicio de utilidad con metodos y alertas
    private _utilityAlertService: UtilityAlertsService
  ) {
    //Dentro del constructor agregamos todos los campos que necesitara nuestros formularios
    this.formLogin = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  ngOnInit(): void {

  }

  //Metodo para el cual nos permitira "iniciar Sesion" cuando el usuario de en ejecutar al ingresar
  logInSesion() {
    this.showLoading = true;

    //Creamos el modelo request del cual le enviaremos datos  a nuestra API
    const request: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    }

    //Ejecutamos ese metodo
    this._useerService.logIn(request).subscribe({
      //El next nos devolvera la respues
      next: (data) => {
        //Logica, la estructura de respuesta de nuestra api, status, mensaje y valor
        //Si es igual a true a encontrado un usuario con esas credenciales que hemos enviado
        if (data.status) {
          //Guardaremos la sesion del usuario
          this._utilityAlertService.saveSesionUser(data.value);
          //Para que pueda navegar hacia pages
          this.router.navigate(["pages"]);

        } else
          //En dado caso que la respuesta sea falsa
          this._utilityAlertService.showAlerts("sorry no matches found", "Opps!")//Lo siento no exiten coincidencias

      },
      //Siempre se ejecutara cuando terminamos una solicitud
      complete: () => {
        //Nuestro mostrar loading se tiene que ocultar
        this.showLoading = false;
      },
      //En caso de devover un tipo de error
      error: (error) => {
        console.error('Error:', error); // Muestra el error en la consola para depuración
        this._utilityAlertService.showAlerts("unexpected error", "Opps!") //Error inesperado
      }
    })
  }

}