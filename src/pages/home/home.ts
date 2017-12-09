import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $2 from 'jquery';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { AllPelisPage } from '../allpelis/allpelis' ;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  openPage(){
    this.navCtrl.push(AllPelisPage);
  }

  ionViewDidLoad(){

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
                    //obj = JSON.parse(respuesta);//Pa reemplazar al eval
                    //console.log(resp['peliculas']);
                    var peliculas = resp['peliculas'];
                    var documentales = resp['documentales'];
                    //cantidad = resp.length;
                    //var contenido = "<h5 class='titulo-scroll'>Novedades<span (click)='presentLoadingDefault() 'id='verpelis' style='float:right;'>Ver mas</span></h5>";
                    /*var contenido = "<h5 class='titulo-scroll'>Novedades";
                    contenido += '<ion-buttons end="" class="bar-buttons bar-buttons-md">';
                    contenido += '<button color="light" icon-only="" ion-button="" class="disable-hover bar-button bar-button-md bar-button-default bar-button-default-md bar-button-md-light" ng-reflect-color="light"><span class="button-inner">';
                    contenido += '<ion-icon name="search" role="img" class="icon icon-md ion-md-search" aria-label="search" ng-reflect-name="search"></ion-icon>';
                    contenido += '</span><div class="button-effect"></div></button>';
                    contenido += '</ion-buttons></h5>';*/
                    //contenido += "<div class='scrolls'>";
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
                    //contenido += "<h5 class='titulo-scroll'>Documentales</h5><div class='scrolls'>";
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

    }

}
