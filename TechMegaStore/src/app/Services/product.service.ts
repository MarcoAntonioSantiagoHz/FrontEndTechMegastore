import { Injectable } from '@angular/core';
//Imports para utilizar las solicitudes HTPP
import { HttpClient } from '@angular/common/http';
//Import para poder recibir las respuestas de las apis
import { Observable } from 'rxjs';
//Import que hace referencia la url donde esta globalmente instanciado la API
import { environment } from '../../environments/environment';
//Import que hace referencia a las respuestas de la API
import { ResponseApi } from '../Interfaces/response-api';
//Import que hace referencia a nuestra interfaz de producto
import { Product } from '../Interfaces/product';


//Dentro de este service ejecutara todos los metodos de nuestra APIRest
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Creamos la variable  que nos permitira armar la URL de nuestra API, 
  // instanciando el endpoint asi como las interfaz a utilizar
  private urlApi: string = environment.endpoint + "Product/";

  //Dentro del constructor inyectamos la dependencias de HttpClient, para poder realizar solicitudes
  constructor(private http: HttpClient) { }

  //Creamos los metodos

  
  //Metodo para poder obtener la listas de Productos
  listProducts(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/ListProducts`);
  }

  //Metodo para guardar un Producto en este caso CREAR
  saveProduct(request: Product): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo post para guardar
    return this.http.post<ResponseApi>(`${this.urlApi}/SaveProduct`, request);
  }

  //Metodo para EDITAR un Producto
  editProduct(request: Product): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo put para editar
    return this.http.put<ResponseApi>(`${this.urlApi}/EditProduct`, request);
  }

  //Metodo para EDITAR un Producto
  deleteProduct(id: number): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo delete para eliminar un registro para ello le pasaremos el id
    return this.http.delete<ResponseApi>(`${this.urlApi}/DeleteProduct/${id}`);
  }

}
