import { Component, OnInit } from '@angular/core';


//Importamos el Inject que nos permitira recibir dede otro componente hasta cualquier informacion que le estemos pasando
import { Inject } from '@angular/core';
//Importamos lo que necesitaremos para trabajar con los formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importamos la forma de obtener datos atraves de los modales
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//Importamos nuestra interfaz de categoria
import { Category } from '../../../../Interfaces/category';
//Importamos nuestra interfaz de Producto
import { Product } from '../../../../Interfaces/product';
//Importamos el servicio de categoria para obtener la lista  de categorias
import { CategoryService } from '../../../../Services/category.service';
//Importamos  el servicio de productos
import { ProductService } from '../../../../Services/product.service';
//Importamos nuestra utilidad
import { UtilityAlertsService } from '../../../../Reusable/utility-alerts.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.css'
})
export class ModalProductComponent implements OnInit {

  //Creamos variables 
  //Formulario para crear o editar usuario
  formProduct: FormGroup;
  //Creamos variable que almacenara el titulo y mostrara "CrearUsuario" Y/O "Editar Usuario"
  titleAction: string = "Agregar:";
  //Boton que nos diga si vamos a guardar o editar
  bottomAction: string = "Guardar:";
  //Lista de roles de tipo array/Esta vacio
  listCategory: Category[] = [];




  //Dentro del constructor inyectamos las dependencias
  constructor(
    //Este componente dando a entender que es un modal Actual
    private currentModal: MatDialogRef<ModalProductComponent>,
    //Inyectamos el componente para recibir los datos, ProductDatas = datosdeProducto
    @Inject(MAT_DIALOG_DATA) public ProductDatas: Product,
    //Nos permitira crear los campos de nuestro formulario
    private fb: FormBuilder,
    //Inyeccioin de nuestros servicios
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _utilityAlertService: UtilityAlertsService,

  ) {
    //Declaramos los campos de nuestro formulario
    this.formProduct = this.fb.group({
      //Creamos los campos que seran de tipo requerido
      name: ['', Validators.required],
      idCategory: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      active: ['1', Validators.required], // Si active es un valor por defecto, puede ser '1' o 1, pero asegúrate de que coincida con el tipo de datos del campo

    });
    //Cuando recibimos informacion del producto
    //  y queremos editar tambien nos debe mostrar la opcion de editar
    //Condicionar para verificar si esta pasando informacion del producto
    //Si es diferente a nulo quiere decir que si tiene informacion
    if (this.ProductDatas != null) {
      this.titleAction = "Editar_EDIT";
      this.bottomAction = "Actualizar";
    }


    //Obtendremos nuestra lista de categortias
    //Obtenemos todos las categorias, solo con subscribe podremos obtener la informacion
    this._categoryService.listCategory().subscribe({
      next: (datas) => {
        //Si es igual a true, rellenara nuestra lista de roles
        if (datas.status) this.listCategory = datas.value
      },
      //En caso de error 
      error: (errors) => { }
    });

  }


  //Personalizamos en el caso de que nuestro datos de prodcuto tenga informacion
  ngOnInit(): void {
    //Si nuestro datos de productos tienen valores seteraremos esos valores  a nuestros campos que son:
    if (this.ProductDatas != null) {
      this.formProduct.patchValue({
        name: this.ProductDatas.name,
        idCategory: this.ProductDatas.idCategory,
        stock: this.ProductDatas.stock,
        price: this.ProductDatas.price,
        active: this.ProductDatas.active.toString()
      });
    }
  }


  //Creamos la logica para el CRUD de productos


  //Creamos el metodo para crear/guardar un producto
  //Creamos el metodo del cual dara el evento de crear y/o editar un usuario
  saveEdit_Product() {
    // Variable de tipo constante
    const _product: Product = {
      idProduct: this.ProductDatas == null ? 0 : this.ProductDatas.idProduct,
      name: this.formProduct.value.name,
      idCategory: this.formProduct.value.idCategory,
      descriptionCategory: "",
      price: this.formProduct.value.price,
      stock: this.formProduct.value.stock,
      // Lo convertimos en un entero
      active: parseInt(this.formProduct.value.active),
    }

    // LÓGICA PARA EL PRODUCTO PODER CREAR
    // Para ejecutar el servicio de guardar o editar de nuestro producto
    // Si es igual a nulo tendremos que crear un producto
    if (this.ProductDatas == null) {
      this._productService.saveProduct(_product).subscribe({
        next: (datas) => {
          // Después de guardar necesitamos validar
          if (datas.status) {
            // Producto registrado exitosamente
            this._utilityAlertService.showAlerts("Product Successfully Registered", "Success");
            // Después de que haya sido registrado el producto procesa a cerrarse
            this.currentModal.close(true);
          } else {
            // ¡Error! No Se Pudo Registrar El producto
            this._utilityAlertService.showAlerts("Error!", "Could Not Register Product");
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
      // LÓGICA PARA EL PRODUCTO PODER "EDITAR"
    } else {
      this._productService.editProduct(_product).subscribe({
        next: (datas) => {
          // Después de guardar necesitamos validar
          if (datas.status) {
            // producto editado exitosamente
            this._utilityAlertService.showAlerts("Product Successfully Edited", "Success");
            // Después de que haya sido registrado el producto procesa a cerrarse
            this.currentModal.close(true);
          } else {
            // ¡Error! No Se Pudo Editar El Producto
            this._utilityAlertService.showAlerts("Error!", "Could Not Edit Product");
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
