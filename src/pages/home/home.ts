import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $2 from 'jquery';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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

  ionViewDidLoad(){
    
      $2.ajax({
        type: 'POST',
        url: 'http://tulflix.tk/api/php/home.php',
        //beforeSend: loading(3),
        data:'accion=getImageName&from=peliculas',
        dataType:"json",
        success: function(respuesta) {
                if (respuesta !== 0) {
                    var resp = eval(respuesta);
                    //obj = JSON.parse(respuesta);//Pa reemplazar al eval
                    //console.log(resp);
                    
                    //cantidad = resp.length;
                    var contenido = "<h5 class='titulo-scroll'>Novedades</h5><div class='scrolls'>";
                    $2.each(resp,function(index){
                        contenido += '<div class="box">';
                        contenido += '<a data-url="'+resp[index].url+'" class="image fit pelicula"><img src="'+resp[index].image+'" alt="" /></a>';
                        contenido += '<div class="inner">';
                        contenido += '<h6 class="nombre">'+resp[index].name+'</h6>';
                        contenido += '</div>';
                        contenido += '</div>';
                    });
                    contenido += '</div>';
                    $2('#thumbnails2').html(contenido);
                    $2('.spinnerCenter').remove();
                    //showBuscar();
                }else{
                    $2('#thumbnails2').html('Error al Obtener contenido');
                }
                
        }
          });

    }

}
