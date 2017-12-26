import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as $4 from 'jquery';
@Component({
  selector: 'page-allseries',
  templateUrl: 'allseries.html'
})
export class AllSeriesPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.cargarContenido();
  }

  ionViewDidLeave(){
    $4('#thumbnails4').fadeOut(10);
  }
  ionViewDidEnter(){
    //$3('.spinnerCenter').fadeIn(10);
    setTimeout(function() {
      //$3('.spinnerCenter').fadeOut(10);
      $4('#thumbnails4').fadeIn(5);
    }, 5);
  }

  cargarContenido(){
    $4('#thumbnails3').fadeOut(10);
    $4.ajax({
      type: 'POST',
      url: 'http://tulflix.tk/api/php/home.php',
      //beforeSend: loading(3),
      data:'accion=getImageName&from=series',
      dataType:"json",
      success: function(respuesta) {
              if (respuesta !== 0) {
                  var series = eval(respuesta);
                  
                  var contenido = "";
                  $4.each(series,function(index){
                      contenido += '<div class="box">';
                      contenido += '<a data-url="'+series[index].url+'" class="image fit serie"><img src="'+series[index].image+'" alt="" /></a>';
                      contenido += '<div class="inner">';
                      contenido += '<h6 class="nombre">'+series[index].name+'</h6>';
                      contenido += '</div>';
                      contenido += '</div>';
                  });
                  contenido += '</div>';
                  $4('#thumbnails4').html(contenido);
                  $4('.spinnerCenter').fadeOut(10);
                  $4('#thumbnails4').fadeIn(200);
                  
                  //showBuscar();
              }else{
                  $4('#thumbnails4').html('Error al Obtener contenido');
              }
              
      }
    });

  }

}
