import { Injectable } from '@angular/core';
// Importacion de las referencias a utilizar
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';


@Injectable({
  providedIn: 'root'
})
export class UtilityAlertsService {

  //Iyectamos las referencias de matSanckBar
  constructor(private _snackBar: MatSnackBar) { }

  // Creamos un metodo del cual devolvera un mensaje de alerts

  //MostrarAlerta
  showAlerts(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "end", //Posicion horizaontal que se muestre al final
      verticalPosition: "top",
      duration: 3000//Duarara solo 3 segundos el mensaje
    });
  }

    //Metodos para guardar sesion
    saveSesionUser(userSesion:Sesion){
      //Nos permitira guardar informacion en memoria del navegador
     localStorage.setItem("user",JSON.stringify(userSesion)); 
    }

    // // Metodo para obtener la sesion del usuario
    // getSesionUser(userSesion:Sesion){
    //   //Obtenemos la data en forma de cadena
    //   const dataCadena = localStorage.getItem("user");
    //   //Convertimos esa cadena de data en un usuario y ponemos el signo ! para recibir un valor que NO sea NUlo
    //   const user = JSON.parse(dataCadena!);
    //   if (dataCadena) {
    //     return JSON.parse(dataCadena);
    //   }
    //   //Retornamos el usuario
    //   return user;

    // }


    // // Metodo 2 para obtener la sesion del usuario
    getSesionUser(): Sesion | null {
      const dataCadena = localStorage.getItem("user");
      if (dataCadena) {
        return JSON.parse(dataCadena);
      }
      return null;
    }


    //Metodo para poder eliminar la sesion del usuario
    deleteSesionUser(){
      localStorage.removeItem("user")
    }
}
