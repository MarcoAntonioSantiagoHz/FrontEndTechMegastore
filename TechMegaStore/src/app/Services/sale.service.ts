import { Injectable } from '@angular/core';
//Imports para utilizar las solicitudes HTPP
import { HttpClient } from '@angular/common/http';
//Import para poder recibir las respuestas de las apis
import { Observable } from 'rxjs';
//Import que hace referencia la url donde esta globalmente instanciado la API
import { environment } from '../../environments/environment';
//Import que hace referencia a las respuestas de la API
import { ResponseApi } from '../Interfaces/response-api';
//Import que hace referencia a nuestra interfaz de venta
import { Sale } from '../Interfaces/sale';


//Dentro de este service ejecutara todos los metodos de nuestra APIRest
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  //Creamos los metodos
  //Creamos la variable  que nos permitira armar la URL de nuestra API, 
  // instanciando el endpoint asi como las interfaz a utilizar
  private urlApi: string = environment.endpoint + "Sale/";

  //Dentro del constructor inyectamos la dependencias de HttpClient, para poder realizar solicitudes
  constructor(private http: HttpClient) { }

  //Creamos los metodos

  //Metodo para Registrar una venta
  register(request: Sale): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo post para registrar 
    return this.http.post<ResponseApi>(`${this.urlApi}/Register`, request);
  }

  //Metodo para generar un historial de venta
  //Utiliza los parametros de  buscar por, numero de venta, fecha de inicio y fecha de fin
  history(searchFor: string, numberSale: string, startDate: string, dateEnd: string): Observable<ResponseApi> {
    // Método GET en el que colocamos todos los parámetros necesarios en la URL para generar el historial
    return this.http.get<ResponseApi>(`${this.urlApi}/History?searchFor=${searchFor}&numberSale=${numberSale}&startDate=${startDate}&dateEnd=${dateEnd}`);
  }
  
 //Metodo para generar reporte
  //Utiliza los parametros de fecha de inicio y fecha de fin
  report(startDate: string, dateEnd: string): Observable<ResponseApi> {
    // Método GET en el que colocamos todos los parámetros necesarios en la URL para generar el reporte
    return this.http.get<ResponseApi>(`${this.urlApi}/Report?startDate=${startDate}&dateEnd=${dateEnd}`);
  }
}
