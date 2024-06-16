import { Component, OnInit } from '@angular/core';

//Importamos la libreria del Chart para poder trabajar con los graficos
import { Chart, registerables, scales } from 'chart.js';
//Importamos nuestro servicio de dashBoard
import { DashBoardService } from '../../../../Services/dash-board.service';
//Importamos para  el registrar todos los graficos que vamos a utilizar en este caso de barras
Chart.register(...registerables);



@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{

  //CREAMOS NUESTRAS VARIABLES
  //variable total ingresos, la ponemos en string y seteamos en cero
  totalIncome: string="0";
  //variable total ventas, la ponemos en string y seteamos en cero
  totalSales:string="0";
  //variable total productos, la ponemos en string y seteamos en cero
  totalProducts:string="0";



  constructor(
    //Iyectamos las dependencias
    private _dashboardService: DashBoardService
  ){}
  
  //Creamos un metodo mostrar grafico que nos permitira mostrar la informacion en un grafico de barras
  //nuestro grafico de barras necesita datos y etiquetas
  showGraphics (labelGraphic:any[], dataGraphic:any[]){
    //Constante de chart barras y personalizamos barras
    const chartBars = new Chart('chartBars',{
      //Insertamos todo los necesario para mostrar nuestro grafico
        //tipo de barras
        type: 'bar',
        //data: necesitamos pasarle informacion
        data: {
          //se mostrara por cada barra
          labels: labelGraphic,
          //pasamos informacion por cada barra
          datasets: [{
            //titulo de nuestro grafico
            label: '# De Ventas',
            //Parametro que estamos recibiendo
            data: dataGraphic,
            //Color del fondo de la barra
            backgroundColor:[
              'rgb(103,58,183)'
            ],
            //Color del borde de la barra
            borderColor: [
              'rgba(203, 29, 29, 0.422);'
            ],
            //El ancho del border
            borderWidth: 1
          }]
        },
        //Ponemos las opciones de este grafico
        options:{
          //Esto hara que sea responsivo y se adapte a cada pantalla
          maintainAspectRatio: false,
          responsive: true,
          //Definimos desde cuando iniciara la escala 
          scales: {
            //Empezara desde cero
            scales:{
            beginAtZero:true
            }
          }
        }
    });


  }


  //Metodo de cuando nuestro componente empieza 
  ngOnInit(): void {
    this._dashboardService.overview().subscribe({
      // si es true significa que tiene informacion
      next:(datas) => {
        if(datas.status){
          this.totalIncome = datas.value.totalIncome; //total ingresos
          this.totalSales = datas.value.totalSales; //totoal ventas
          this.totalProducts = datas.value.totalProducts; //total productos

          //obtenemos la informacioni para poder pintar nuestro grafico
          const arrayData: any[]=datas.value.saleLastWeek; //ventas ultima semana
          //evaluamos lo que estamos recibiendo con un console log
          console.log(arrayData);



          //Separamos 
          //Constante label temporal
          const labelTemp = arrayData.map((value)=> value.date); //fecha
          //Constante data temporal
          const dataTemp = arrayData.map((value)=> value.total);//total
          //solo como prueba para ver el contenido
          console.log(labelTemp,dataTemp);

          //llamamos nuestro metodo y le pasamos los parametros de la constante de arriba
          this.showGraphics(labelTemp, dataTemp); 
        }
      },
      //Validamos por si hay un error
      error: (error) =>{}
    });
  }

}
