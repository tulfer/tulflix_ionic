import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';
import { AllSeriesPage } from '../allseries/allseries' ;

@Component({
  selector: 'page-series',
  templateUrl: 'series.html'
})
export class SeriesPage {

  constructor(public navCtrl: NavController) {

  }
  openPage(){
    this.navCtrl.push(AllSeriesPage);
  }
  
  ionViewDidLoad(){
    
    //$('#thumbnails').html('<center><div class="spinner"></div></center>');
    
      $.ajax({
        type: 'POST',
        url: 'http://tulflix.tk/api/php/home.php',
        //beforeSend: loading(3),
        data:'accion=getImageName&from=inicioSeries',
        dataType:"json",
        success: function(respuesta) {
                if (respuesta !== 0) {
                    var series = eval(respuesta);
                    //obj = JSON.parse(respuesta);//Pa reemplazar al eval
                    //console.log(resp);
                    
                    var contenido = "";
                    $.each(series,function(index){
                        contenido += '<div class="box">';
                        contenido += '<a data-url="'+series[index].url+'" class="image fit pelicula"><img src="'+series[index].image+'" alt="" /></a>';
                        contenido += '<div class="inner">';
                        contenido += '<h6 class="nombre">'+series[index].name+'</h6>';
                        contenido += '</div>';
                        contenido += '</div>';
                    });
                    contenido += '</div>';
                    $('#contSeries').html(contenido);
                    $('.spinnerCenter').remove();
                    $('#thumbnails').fadeIn(150);
                    
                    //showBuscar();
                }else{
                    $('#thumbnails').html('Error al Obtener contenido');
                }
                
        }
          });

    }
  


}
