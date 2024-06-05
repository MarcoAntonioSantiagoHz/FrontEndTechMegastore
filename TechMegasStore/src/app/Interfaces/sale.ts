import { SaleDetail } from "./sale-detail";

export interface Sale {
    //Propiedades que necesita nuestra interfaz
    idSale?: number; //El simbolo ? significa que pueden entrar nulos
    documentNumber?: string;
    paymentType: string;
    dateRegistration?: string;
    saleTotalText: string;
    saleDetails: SaleDetail[]; //Es un array ahi estara toda la lista 
}
