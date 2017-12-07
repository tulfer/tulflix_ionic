import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $2 from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    
    $2('#thumbnails2').html('<center><div class="spinner"></div></center>');
    
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
                    var contenido = "";
                    $2.each(resp,function(index){
                        contenido += '<div class="box">';
                        contenido += '<a data-url="'+resp[index].url+'" class="image fit pelicula"><img src="'+resp[index].image+'" alt="" /></a>';
                        contenido += '<div class="inner">';
                        contenido += '<h6 class="nombre">'+resp[index].name+'</h6>';
                        contenido += '</div>';
                        contenido += '</div>';
                    });
                    $2('#thumbnails2').html(contenido);
                    
                    //showBuscar();
                }else{
                    $2('#thumbnails2').html('Error al Obtener contenido');
                }
                
        }
          });

    }

  

}
