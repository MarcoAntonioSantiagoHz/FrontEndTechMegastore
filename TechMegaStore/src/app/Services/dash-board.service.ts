import { Injectable } from '@angular/core';
//Imports para utilizar las solicitudes HTPP
import { HttpClient } from '@angular/common/http';
//Import para poder recibir las respuestas de las apis
import { Observable } from 'rxjs';
//Import que hace referencia la url donde esta globalmente instanciado la API
import { environment } from '../../environments/environment';
//Import que hace referencia a las respuestas de la API
import { ResponseApi } from '../Interfaces/response-api';
//Nota:Aqui no utilizamos el servicio de interfaz ya que solo devolvemos el servicio de respuesta
//Dentro de este service ejecutara todos los metodos de nuestra APIRest
@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  //Creamos los metodos
  //Creamos la variable  que nos permitira armar la URL de nuestra API, 
  // instanciando el endpoint asi como las interfaz a utilizar
  private urlApi: string = environment.endpoint + "DashBoard/";

  //Dentro del constructor inyectamos la dependencias de HttpClient, para poder realizar solicitudes
  constructor(private http: HttpClient) { }

  //Creamos los metodos


  //Metodo para poder obtener el resumen
  overview(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Overview`);
  }


}
