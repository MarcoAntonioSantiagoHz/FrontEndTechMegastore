import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//Importamos lo que necesitaremos para trabajar con los formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importamos las tablas de material
import { MatTableDataSource } from '@angular/material/table';

//Importamos los servicios
import { ProductService } from '../../../../Services/product.service';
import { SaleService } from '../../../../Services/sale.service';
//Importamos nuestra utilidad
import { UtilityAlertsService } from '../../../../Reusable/utility-alerts.service';

//Importamos las interface
import { Product } from '../../../../Interfaces/product';
import { Sale } from '../../../../Interfaces/sale';
import { SaleDetail } from '../../../../Interfaces/sale-detail';
// Importamos para que nos permita mostrar alertar personalizadas
import Swal from 'sweetalert2';
import { ModalUserComponent } from '../../Modals/modal-user/modal-user.component';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit {

  //Creamos variables dentro de la clase

  //La base para almacenar todos los productos registrados
  listProducts: Product[] = [];
  //Esta variable contendra los filtros, ejemplo conforme vaya escribiendo un producto en si, en el buscador aparecera resultados
  listProductsFilter: Product[] = [];
  //Lista de productos para la venta
  listproductsForSale: SaleDetail[] = [];
  //Bloquear boton  para registrar
  lockRegisterButton: boolean = false;
  //Producto seleccionado
  selectedProduct!: Product;
  //Tipo de pago por defecto
  defaultPaymentType: string = "Efectivo";
  //Total a pagar, se actualizara por si solo cada vez que se una o quite un nuevo producto
  paymentTotal: number = 0;
  //formulario "producto venta" Variable para ingresar el producto y tambien la cantidad que necesita el usuario para realizar la venta
  formProductSale: FormGroup;
  //Creamos la columna para nuestras tablas
  columnsTables: string[] = [
    //Ponemos todas las columnas que tendra nuestra tabla
    'product',
    'amount',//Cantidad
    'price',
    'total',
    'acciones',
  ];
  //Datos detalle de venta, y agregamos el valor por defecto
  dateDetailSale = new MatTableDataSource(this.listproductsForSale);


  //Creamos el metodo para la busqueda por nombre y producto


  //metodo retornar productos por el filtro
  //Recibe parametro una busqueda de tipo any y devolvera un array de producto
  returnProductsForFilter(search: any): Product[] {
    //Creamos una constante de "valor buscado"
    //Si busqueda es igual a una cadena de texto "string"caso contrario lo convertimos a busqueda a un objeto "producto"
    const searchedValue = typeof search === "string" ? search.toLocaleLowerCase() : search.name.toLocaleLowerCase()
    return this.listProducts.filter(item => item.name.toLocaleLowerCase().includes(searchedValue));
  }



  constructor(
    // Inyectamos todas las dependencias que necesitamos
    private fb: FormBuilder,
    //Inyeccioin de nuestro servicios
    private _productService: ProductService,
    private _saleService: SaleService,
    //Haciendo referencia a utilidad service
    private _utilityAlertService: UtilityAlertsService,

  ) {
    //Creamos los campos que recibira nuestro formulario el cual sera producto y cantidad que desea comprar
    this.formProductSale = this.fb.group({
      product: ['', Validators.required],
      amount: ['', Validators.required],
    });



    //Metodo para Obtener todos los productos, solo con subscribe podremos obtener la informacion
    this._productService.listProducts().subscribe({
      next: (datas) => {
        if (datas.status) {
          //Creamos una constante y los valores que tiene respuesta a nuestra api
          //Lo convertimos en un array de productos
          const list = datas.value as Product[];
          //Ahora almacenamos en nuestra lista de productos y obtenemos los productos que son activos
          this.listProducts = list.filter(p => p.active == 1 && p.stock > 0);
        }
      },
      //En caso de error 
      error: (errors) => { }
    });

    //Metodo cuando se busca un producto ya sea por iniciales o por letras referentes a ellos buscara productos relacionados con ellos
    this.formProductSale.get('product')?.valueChanges.subscribe(value => {//lo aremoa atravez de value
      this.listProductsFilter = this.returnProductsForFilter(value);
    });

  }


  ngOnInit(): void {
     console.log('Component initialized');
  }


  //Creamos el metodo para producto que ha seleccionado por medio de campo de busqueda
  //mostrar producto
  showProduct(product: Product): string {
    return product.name;
  }

  //Metodo para guardar temporalmente el producto seleccionado de la lista "producto para venta"
  productForSale(event: any) {
    //llamamos al producto seleccionado y le pasamos el objeto seleccionado
    this.selectedProduct = event.option.value;
  }

  //Metodo para registrar el producto elegido dentro de nuestra tabla para realizar la venta
  //agregar producto para venta
  addProductForSale() {
    //cantidad
    const _amount: number = this.formProductSale.value.amount; //formulario producto venta pasa cantidad
    const _price: number = parseFloat(this.selectedProduct.price) //Precio pasa a float y seleccionadmos el producto seleccionado
    const _total: number = _amount * _price; //Multiplicamos los valores de cantidad por precio
    // llamamos a total a pagar y le sumamos el total
    this.paymentTotal = this.paymentTotal + _total;

    //Almacenar en nuestra lista de productos para venta nuestro objeto
    this.listproductsForSale.push({
      idProduct: this.selectedProduct.idProduct,
      descriptionProduct: this.selectedProduct.name,
      amount: _amount,
      priceText: String(_price.toFixed(2)), //Se pone el toFixed(2) para poder trabajar con 2 decimales
      totalText: String(_total.toFixed(2))
    });

    //Ahora actualizamos nuestra tabla
    this.dateDetailSale = new MatTableDataSource(this.listproductsForSale);

    //Ahora restablecemos nuestro formulario
    this.formProductSale.patchValue({
      product: '',
      amount: ''
    });

  }


  //Metodo paa eliminar un producto de la lista
  deleteProduct(detail: SaleDetail) {
    //Hacemos una resta total a pagar con 
    this.paymentTotal = this.paymentTotal - parseFloat(detail.totalText),
      //Actualizamos
      this.listproductsForSale = this.listproductsForSale.filter(p => p.idProduct != detail.idProduct);
    //Ahora actualizamos nuestra tabla
    this.dateDetailSale = new MatTableDataSource(this.listproductsForSale);
  }

  //Metodo para crear y/o registrar una venta
  registerSale() {
    //Primero validamos si tenemos productos para vender
    //Si la lista de productos para venta es mayor a cero entonces...
    if (this.listproductsForSale.length > 0) {
      this.lockRegisterButton = true; //Bloquemos el boton de registrar para que no este presionando 2 veces seguidas

      const request: Sale = {
        paymentType: this.defaultPaymentType, //tipo de pago por defecto
        saleTotalText: String(this.paymentTotal.toFixed(2)),
        saleDetails: this.listproductsForSale
      }

      this._saleService.register(request).subscribe({
        next: (response) => {
          //Si es true significa que ha sido registrada
          if (response.status) {
            this.paymentTotal = 0.00;
            this.listproductsForSale = [];
            this.dateDetailSale = new MatTableDataSource(this.listproductsForSale);

            //Mostramos un mensaje 
            Swal.fire({
              icon: 'success',
              title: "Sale Register!", //Venta registrada
              text: `Sale Number ${response.value.documentNumber}`, //Numero de venta
            });
          } else {
            //Muestra mensaje "No se pudo registrar la venta"
            this._utilityAlertService.showAlerts("The sale could not be registered", "Error");
          }
        },
        complete: () => {
          //Nuestro boton ya no estara bloqueado
          this.lockRegisterButton = false;
        },
        error: (error) => { }
      });
    }
  }

}
