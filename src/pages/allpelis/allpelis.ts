import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as $3 from 'jquery';
@Component({
  selector: 'page-allpelis',
  templateUrl: 'allpelis.html'
})
export class AllPelisPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.cargarContenido();
  }

  ionViewDidLeave(){
    $3('#thumbnails3').fadeOut(10);
  }
  ionViewDidEnter(){
    //$3('.spinnerCenter').fadeIn(10);
    setTimeout(function() {
      //$3('.spinnerCenter').fadeOut(10);
      $3('#thumbnails3').fadeIn(5);
    }, 5);
  }

  cargarContenido(){
    $3('#thumbnails3').fadeOut(10);
    $3.ajax({
      type: 'POST',
      url: 'http://tulflix.tk/api/php/home.php',
      //beforeSend: loading(3),
      data:'accion=getImageName&from=peliculas',
      dataType:"json",
      success: function(respuesta) {
              if (respuesta !== 0) {
                  var peliculas = eval(respuesta);
                  
                  var contenido = "";
                  $3.each(peliculas,function(index){
                      contenido += '<div class="box">';
                      contenido += '<a data-url="'+peliculas[index].url+'" class="image fit pelicula"><img src="'+peliculas[index].image+'" alt="" /></a>';
                      contenido += '<div class="inner">';
                      contenido += '<h6 class="nombre">'+peliculas[index].name+'</h6>';
                      contenido += '</div>';
                      contenido += '</div>';
                  });
                  contenido += '</div>';
                  $3('#thumbnails3').html(contenido);
                  $3('.spinnerCenter').fadeOut(10);
                  $3('#thumbnails3').fadeIn(200);
                  
                  //showBuscar();
              }else{
                  $3('#thumbnails3').html('Error al Obtener contenido');
              }
              
      }
    });

  }

}
