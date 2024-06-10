import { Component, OnInit, } from '@angular/core';
//Importamos el Inject que nos permitira recibir dede otro componente hasta cualquier informacion que le estemos pasando
import { Inject } from '@angular/core';
//Importamos lo que necesitaremos para trabajar con los formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importamos la forma de obtener datos atraves de los modales
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//Importamos nuestra interfaz de ROL
import { Role } from '../../../../Interfaces/role';
//Importamos nuestra interfaz de usuario
import { Useer } from '../../../../Interfaces/useer';
//Importamos el servicio de Rol
import { RoleService } from '../../../../Services/role.service';
//Importamos  el servicio de usuarios
import { UseerService } from '../../../../Services/useer.service';
//Importamos nuestra utilidad
import { UtilityAlertsService } from '../../../../Reusable/utility-alerts.service';





@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent implements OnInit {

  //Creamos nuestras variables 

  //Formulario para crear o editar usuario
  formUseer: FormGroup;
  //Varible para ocultar nuestra contraseña
  ocultPassword: boolean = true;
  //Creamos variable que almacenara el titulo y mostrara "CrearUsuario" Y/O "Editar Usuario"
  titleAction: string = "Agregar:";
  //Boton que nos diga si vamos a guardar o editar
  bottomAction: string = "Guardar:";
  //Lista de roles de tipo array/Esta vacio
  listRoless: Role[] = [];


  //Dentro del constructor inyectamos las dependencias
  constructor(
    //Este componente dando a entender que es un modal Actual
    private currentModal: MatDialogRef<ModalUserComponent>,
    //Inyectamos el componente para recibir los datos, userDatas = datosdeUsuario
    @Inject(MAT_DIALOG_DATA) public userDatas: Useer,
    //Nos permitira crear los campos de nuestro formulario
    private fb: FormBuilder,
    //Inyeccioin de nuestros servicios
    private _roleService: RoleService,
    private _userService: UseerService,
    //Hciendo referencia a utilidad service
    private _utilityAlertService: UtilityAlertsService
  ) {
    //Declaramos los campos de nuestro formulario
    this.formUseer = this.fb.group({
      //Creamos los campos que seran de tipo requerido
      completeName: ['', Validators.required],
      email: ['', Validators.required],
      idRole: ['', Validators.required],
      password: ['', Validators.required],
      active: ['1', Validators.required], // Si active es un valor por defecto, puede ser '1' o 1, pero asegúrate de que coincida con el tipo de datos del campo
    });
    //Cuando recibimos informacion del usuario
    //  y queremos editar tambien nos debe mostrar la opcioin de editar
    //Condicionar para verificar si esta pasando informacion del usuario
    //Si es diferente a nulo quiere decir que si tiene informacion
    if (this.userDatas != null) {
      this.titleAction = "Editar_EDIT";
      this.bottomAction = "Actualizar";
    }

    //Obtenemos todos los roles, solo con subscribe podremos obtener la informacion
    this._roleService.listRole().subscribe({
      next: (datas) => {
        //Si es igual a true, rellenara nuestra lista de roles
        if (datas.status) this.listRoless = datas.value
      },
      //En caso de error 
      error: (errors) => { }
    });


  }

  ngOnInit(): void {
    //Este metodo se ejecuta cuando nuestro componente ya se este cargando, se este iniciando
    if (this.userDatas != null) {
      //Brindamos toda la informacion de nuestro formulario
      this.formUseer.patchValue({
        completeName: this.userDatas.completeName,
        email: this.userDatas.email,
        idRole: this.userDatas.idRole,
        password: this.userDatas.password,
        active: this.userDatas.active.toString()
      });
    }
  }

  //Creamos el metodo del cual dara el evento de crear y/o editar un usuario
  saveEdit_User() {
    // Variable de tipo constante
    const _useer: Useer = {
      idUser: this.userDatas == null ? 0 : this.userDatas.idUser,
      completeName: this.formUseer.value.completeName,
      email: this.formUseer.value.email,
      idRole: this.formUseer.value.idRole,
      roleDescription: "",
      password: this.formUseer.value.password,
      // Lo convertimos en un entero
      active: parseInt(this.formUseer.value.active),
    }
  
    // LÓGICA PARA EL USUARIO PODER CREAR
    // Para ejecutar el servicio de guardar o editar de nuestro usuario
    // Si es igual a nulo tendremos que crear un usuario
    if (this.userDatas == null) {
      this._userService.saveUseer(_useer).subscribe({
        next: (datas) => {
          // Después de guardar necesitamos validar
          if (datas.status) {
            // Usuario registrado exitosamente
            this._utilityAlertService.showAlerts("User Successfully Registered", "Success");
            // Después de que haya sido registrado el usuario procesa a cerrarse
            this.currentModal.close(true);
          } else {
            // ¡Error! No Se Pudo Registrar El Usuario
            this._utilityAlertService.showAlerts("Error!", "Could Not Register User");
            // Cerrar el modal incluso si hay un error
            this.currentModal.close(false);
          }
        },
        error: (error) => {
          // Manejar el error
          console.error(error);
          // Cerrar el modal incluso si hay un error
          this.currentModal.close(false);
        }
      });
      // LÓGICA PARA EL USUARIO PODER EDITAR
    } else {
      this._userService.editUseer(_useer).subscribe({
        next: (datas) => {
          // Después de guardar necesitamos validar
          if (datas.status) {
            // Usuario editado exitosamente
            this._utilityAlertService.showAlerts("User Successfully Edited", "Success");
            // Después de que haya sido registrado el usuario procesa a cerrarse
            this.currentModal.close(true);
          } else {
            // ¡Error! No Se Pudo Editar El Usuario
            this._utilityAlertService.showAlerts("Error!", "Could Not Edit User");
            // Cerrar el modal incluso si hay un error
            this.currentModal.close(false);
          }
        },
        error: (error) => {
          // Manejar el error
          console.error(error);
          // Cerrar el modal incluso si hay un error
          this.currentModal.close(false);
        }
      });
    }
  }
}