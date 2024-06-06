import { Injectable } from '@angular/core';
//Imports para utilizar las solicitudes HTPP
import { HttpClient } from '@angular/common/http';
//Import para poder recibir las respuestas de las apis
import { Observable } from 'rxjs';
//Import que hace referencia la url donde esta globalmente instanciado la API
import { environment } from '../../environments/environment';
//Import que hace referencia a las respuestas de la API
import { ResponseApi } from '../Interfaces/response-api';
//Import que hace referencia a nuestra interfaz de usuario
import { Useer } from '../Interfaces/useer';

//Import que hace referencia para poder recibir las credenciales
import { Login } from '../Interfaces/login';
//Dentro de este service ejecutara todos los metodos de nuestra APIRest


@Injectable({
  providedIn: 'root'
})
export class UseerService {

  //Creamos la variable  que nos permitira armar la URL de nuestra API, 
  // instanciando el endpoint asi como las interfaz a utilizar
  private urlApi: string = environment.endpoint + "Useer/";

  //Dentro del constructor inyectamos la dependencias de HttpClient, para poder realizar solicitudes
  constructor(private http: HttpClient) { }

  //Creamos los metodos

  //Metodo para poder iniciar sesion
  //Recibe una respuesta de tipo logInn, devulve un observable que es de tipo ResposeApi ya que es nuestra solicitud de respuesta
  logIn(request: Login): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo "logInn" del cual es iniciarSesion, y port medio del request le pasamos las credenciales
    return this.http.post<ResponseApi>(`${this.urlApi}log_in`, request); //Se pone log_in para que coincida con la ruta de la api que es http://localhost:5193/api/Useer/log_in
  }
  //Metodo para poder obtener la listas de usuarios
  listUsers(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}ListUsers`);
  }

  //Metodo para guardar un usuario en este caso CREAR
  saveUseer(request: Useer): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo post para guardar
    return this.http.post<ResponseApi>(`${this.urlApi}SaveUseer`, request);
  }

  //Metodo para EDITAR un usuario
  editUseer(request: Useer): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo put para editar
    return this.http.put<ResponseApi>(`${this.urlApi}EditUseer`, request);
  }

  //Metodo para EDITAR un usuario
  deleteUseer(id: number): Observable<ResponseApi> {
    //Nuestra api  ejecuta el metodo delete para eliminar un registro para ello le pasaremos el id
    return this.http.delete<ResponseApi>(`${this.urlApi}DeleteUseer/${id}`);
  }
}
