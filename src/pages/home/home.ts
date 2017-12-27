import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $2 from 'jquery';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { AllPelisPage } from '../allpelis/allpelis' ;
import { PlayVideoPage } from '../playvideo/playvideo' ;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Hpg = this;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Sirve...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  public openPage(){
    this.navCtrl.push(AllPelisPage);
  }

  openVideo(url_to,server_to,name_to){
    this.navCtrl.push(PlayVideoPage,{ url: url_to, server: server_to, name: name_to});
  }

  ionViewDidLoad(){
    var __this = this;
    $2('#thumbnails2').fadeOut(10);
      $2.ajax({
        type: 'POST',
        url: 'http://tulflix.tk/api/php/home.php',
        //beforeSend: loading(3),
        data:'accion=getImageName&from=inicioPeliculas',
        dataType:"json",
        success: function(respuesta) {
                if (respuesta !== 0) {
                    var resp = eval(respuesta);
                    //obj = JSON.parse(respuesta);//Pa reemplazar al eval (pero no sirve)
                    
                    var peliculas = resp['peliculas'];
                    var documentales = resp['documentales'];
                    var contenido = "";
                    $2.each(peliculas,function(index){
                        contenido += '<div class="box">';
                        contenido += '<a data-url="'+peliculas[index].url+'" class="image fit pelicula"><img src="'+peliculas[index].image+'" alt="" /></a>';
                        contenido += '<div class="inner">';
                        contenido += '<h6 class="nombre">'+peliculas[index].name+'</h6>';
                        contenido += '</div>';
                        contenido += '</div>';
                    });
                    contenido += '</div>';
                    $2('#contPelis').html(contenido);
                    contenido = "";
                    $2.each(documentales,function(index){
                        contenido += '<div class="box">';
                        contenido += '<a data-url="'+documentales[index].url+'" class="image fit pelicula"><img src="'+documentales[index].image+'" alt="" /></a>';
                        contenido += '<div class="inner">';
                        contenido += '<h6 class="nombre">'+documentales[index].name+'</h6>';
                        contenido += '</div>';
                        contenido += '</div>';
                    });
                    contenido += '</div>';
                    $2('#contDocus').html(contenido);
                    $2('.spinnerCenter').remove();
                    $2('#thumbnails2').fadeIn(200);
                    
                    //showBuscar();
                }else{
                    $2('#thumbnails2').html('Error al Obtener contenido');
                }
                
        }
      });

      $2(document).on('click','#verpelis',function(){
        //$2(this).append('+');
      });

      $2(document).on('click', '.pelicula', function(){
        var url = $2(this).data('url');
        var padre = $2(this).parent();
        var hijo = $2('div',padre);
        var nombre = $2('h6',hijo).html();
        var cuerpo = "";
        cuerpo += '<div class="poptrox-overlay" style="position: fixed; left: 0px; top: 0px; z-index: 1001; width: 100%; height: 100%; text-align: center; cursor: pointer; display: block; opacity: 1;">';
        cuerpo += '<div style="display:inline-block;height:100%;vertical-align:middle;"></div>';
        cuerpo += '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#000000;opacity:0.75;filter:alpha(opacity=75);"></div>';
        cuerpo += '<div class="poptrox-popup" style="display: inline-block; vertical-align: middle; position: relative; z-index: 1003; cursor: pointer; min-width: 200px; min-height: 100px; width: 80%; height: auto;">';
        cuerpo += '<div id="videoP" class="pic" style="display: block; text-indent: 0px;max-height:300px;overflow-y:auto;">';
        cuerpo += '<div class="inner">';
        cuerpo += '<h4 class="nombre">'+nombre+'</h4>';
        cuerpo += '</div><hr>';
            cuerpo += '<div class="inner">';
            cuerpo += '<a ><h5 data-name="'+nombre+'" data-url="'+url+'" data-server="www.rapidvideo.com" class="videopelicula">Servidor 1 (liviano)</h5></a>';
            cuerpo += '</div>';
            cuerpo += '<div class="inner">';
            cuerpo += '<a><h5 data-name="'+nombre+'" data-url="'+url+'" data-server="downace.com" class="videopelicula">Servidor 2 (HD)</h5></a>';
            cuerpo += '</div>';
            cuerpo += '<div class="inner">';
            cuerpo += '<a><h5 data-name="'+nombre+'" data-url="'+url+'" data-server="openload.co" class="videopelicula">Servidor 3</h5></a>';
            cuerpo += '</div>';
            cuerpo += '<div class="inner">';
            cuerpo += '<a><h5 data-name="'+nombre+'" data-url="'+url+'" data-server="streamango.com" class="videopelicula">Servidor 4</h5></a>';
            cuerpo += '</div>';
        cuerpo += '</div>';
        cuerpo += '<span class="closer" style="cursor: pointer; display: block;">×</span>';
        cuerpo += '</div>';
        cuerpo += '</div>';
        
        $2('#thumbnails2').append(cuerpo);
        
    });

    /*$2(document).on('click', '.videopelicula', (e) => { 
      var url     = e.data('url');
      var server  = e.data('server');
      console.log("URL : "+url);
      this.openVideo(url,server); 
    });*/

    $2(document).on('click', '.videopelicula', function () { 
      var url_to     = $2(this).data('url');
      var server_to  = $2(this).data('server');
      var name_to    = $2(this).data('name');
      __this.openVideo(url_to,server_to,name_to); 
    });

    $2(document).on('click','.closer',function(){
      hideServers();
    });
    
    $2(document).on('click','.poptrox-popup',function(){
        //console.log('no hace na');
    });

    function hideServers(){
        $2('.poptrox-overlay').fadeOut('slow', function(){
        
        }).remove();
    }

    }

}
