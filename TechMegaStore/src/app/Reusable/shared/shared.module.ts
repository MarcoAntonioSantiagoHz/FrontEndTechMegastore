import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Importamos todos los archivos o recursos necesarios para nuestra aplicacion

//Importacion de formularios reactivos
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Importacion para solicitudes HtppClient
import { HttpClientModule } from '@angular/common/http';

//Importacion de los componentes de angular material
import { MatCardModule } from '@angular/material/card'; //Para las tarjetas
import { MatInputModule } from '@angular/material/input';//Para poder trabajar con las cajas de texto, textArea,Input, texto numericoz correo etc.
import { MatSelectModule } from '@angular/material/select'; //Para poder trabajar con los select
import { MatProgressBarModule } from '@angular/material/progress-bar';//Para poder trabajar con las barras de progreso
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';//Para poder trabajar con las barras de progreso tipo spinner dentro del centro tipo circulo de progreso
import { MatGridListModule } from '@angular/material/grid-list';//Para poder trabajar con las filas y kas columnaas 
//IMPORTACIONES PARA NUESTRA CABECERAS Y  MENU
import { LayoutModule } from '@angular/cdk/layout';//Para poder trabajar con  los contenedores en este caso las barras de menu
import { MatToolbarModule } from '@angular/material/toolbar';//Para poder complementar nuestro menu 
import { MatButtonModule } from '@angular/material/button';//Para poder trabajar con los botones de material 
import { MatSidenavModule } from '@angular/material/sidenav';//Para poder trabajar con  el navBar 
import { MatIconModule } from '@angular/material/icon';     //Para poder trabajar con los iconos de angular  
import { MatListModule } from '@angular/material/list';        //Para poder trabajar con  listas 


import { MatTableModule } from '@angular/material/table';//Para poder trabajar con las tablas
import { MatPaginatorModule } from '@angular/material/paginator';//Para poder trabajar con las paginaciones de la tabla
import { MatDialogModule } from '@angular/material/dialog';//Para poder trabajar con dialogos mejor conocidos como MODALS 
import { MatSnackBarModule } from '@angular/material/snack-bar';//Para poder trabajar con pequeñas alertas 
import { MatTooltipModule } from '@angular/material/tooltip';//Para poder trabajar con pequeñas alertas al pasar el cursos en un boton, una caja de texto etc  
import { MatAutocompleteModule } from '@angular/material/autocomplete';//Para poder trabajar con  la caja de texto del autoComplete, nos vaya dando resultados de acuerdo a lo que hemos escrito
import { MatDatepickerModule } from '@angular/material/datepicker';//Para poder trabajar con las fechas , nos mostrara un calendario y poder seleccionar las fechas  
import { MatNativeDateModule } from '@angular/material/core';//Para poder trabajar con  las fechas globalemente en nuestra app
import { MomentDateModule } from '@angular/material-moment-adapter'; //Para poder trabajar con el cambio de fechas  


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
