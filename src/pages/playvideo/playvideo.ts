import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as $5 from 'jquery';
import { NavParams } from 'ionic-angular/navigation/nav-params';
@Component({
  selector: 'page-playvideo',
  templateUrl: 'playvideo.html'
})
export class PlayVideoPage {

    url: string;
    server: string;
    name: string;
  constructor(public navCtrl: NavController, public navPar: NavParams) {
    this.url     = navPar.get('url');
    this.server  = navPar.get('server');
    this.name    = navPar.get('name');
  }

  ionViewDidLoad(){
    this.cargarContenido();
  }

  ionViewDidLeave(){
    //$5('#contPlayVideo').fadeOut(10);
  }
  ionViewDidEnter(){
    //$5('.spinnerCenter').fadeIn(10);
    setTimeout(function() {
      //$5('.spinnerCenter').fadeOut(10);
      $5('#contPlayVideo').fadeIn(5);
    }, 5);
  }


  cargarContenido(){
    var __this = this;
    $5('#contPlayVideo').fadeOut(10);
    $5.ajax({
      type: 'POST',
      url: 'http://tulflix.tk/api/php/home.php',
      //beforeSend: loading(3),
      data:'accion=getVideoPelicula&url='+__this.url+'&server='+__this.server,
      dataType:"json",
      success: function(respuesta) {
              if (respuesta !== 0) {
                console.log(respuesta);
                  /*var video = eval(respuesta);
                  
                  var contenido = "";
                  $5.each(video,function(index){
                      
                      contenido += '<h3>'+video[index].video+'</h3>';
                      
                  });
                  */
                  
                  
                  var contenido = '<iframe id="tviframe" src="'+respuesta+'" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" frameborder="0" scrolling="no"></iframe>';
                  $5('#contPlayVideo').html(contenido);
                  $5('.spinnerCenter').fadeOut(10);
                  $5('#contPlayVideo').fadeIn(200);
                  
                  //showBuscar();
              }else{
                  $5('#contPlayVideo').html('Error al Obtener contenido');
              }
              
      }
    });

    /*$5(document).on('click','#tviframe',function(e){
      e.preventDefault();
    });*/

    $5('a').on('click', function(e){
      e.preventDefault(); 
           console.log('se supone');
     });
     
     $5(window).on('click',function(e) {
        var target = e.target;
        do {
            if (target.nodeName.toUpperCase() === 'A' && target.href) {
                target.target = '#';
                console.log('entro');
                break;
            }
        } while (target = target.parentElement);
    });

  }

}
