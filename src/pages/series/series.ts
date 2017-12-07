import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-series',
  templateUrl: 'series.html'
})
export class SeriesPage {

  constructor(public navCtrl: NavController) {

  }
  
  ionViewDidLoad(){
    
    $('#thumbnails').html('<center><div class="spinner"></div></center>');
    
      $.ajax({
        type: 'POST',
        url: 'http://tulflix.tk/api/php/home.php',
        //beforeSend: loading(3),
        data:'accion=getImageName&from=series',
        dataType:"json",
        success: function(respuesta) {
                if (respuesta !== 0) {
                    var resp = eval(respuesta);
                    //obj = JSON.parse(respuesta);//Pa reemplazar al eval
                    //console.log(resp);
                    
                    //cantidad = resp.length;
                    var contenido = "";
                    $.each(resp,function(index){
                        contenido += '<div class="box">';
                        contenido += '<a data-url="'+resp[index].url+'" class="image fit serie"><img src="'+resp[index].image+'" alt="" /></a>';
                        contenido += '<div class="inner">';
                        contenido += '<h6 class="nombre">'+resp[index].name+'</h6>';
                        contenido += '</div>';
                        contenido += '</div>';
                    });
                    $('#thumbnails').html(contenido);
                    
                    //showBuscar();
                }else{
                    $('#thumbnails').html('Error al Obtener contenido');
                }
                
        }
          });

    }
  


}
