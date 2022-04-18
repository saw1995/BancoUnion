import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { globals } from '../globals';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-agregar',
  templateUrl: './cliente-agregar.component.html',
  styleUrls: ['./cliente-agregar.component.css']
})
export class ClienteAgregarComponent implements OnInit {

  url:string = globals.url;

  nombre:string = "";
  apellido_paterno:string = "";
  apellido_materno:string = "";
  tipo_documento:string = "";
  numero_documento:string = "";
  fecha_nacimiento:string = "1990-01-01";
  genero:string = "";

  constructor(private http:HttpClient, private route:Router) { }

  ngOnInit(): void {
  }

  navegarHaciaListaClientes(){
    this.route.navigate(['cliente']);
  }

  postAgregarCliente(){

    Swal.fire({title: 'Guardando nuevo registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.nombre == ""){
      Swal.fire("Campo vacío", "El campo NOMBRE no puede estar vacío, intente nuevamente", "warning");
    }
    else if(this.apellido_paterno == ""){
      Swal.fire("Campo vacío", "El campo APELLIDO PATERNO no puede estar vacío, intente nuevamente", "warning");
    }
    else if(this.numero_documento == ""){
      Swal.fire("Campo vacío", "El campo NUMERO DE DOCUMENTO no puede estar vacío, intente nuevamente", "warning");
    }
    else if(this.tipo_documento == "" || this.genero == ""){
      Swal.fire("Campo vacío", "Debe selecionar el tipo de documento o el genero, intente nuevamente", "warning");
    }
    else{

      let parametros = {
        nombre:this.nombre,
        apellido_paterno:this.apellido_paterno,
        apellido_materno:this.apellido_materno,
        tipo_documento:this.tipo_documento,
        numero_documento:this.numero_documento,
        fecha_nacimiento:this.fecha_nacimiento,
        genero:this.genero
      };

      this.http.post(this.url + "cliente/guardarDatosCliente", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        if(datos_recibidos.estado==true){
          
          this.navegarHaciaListaClientes();

          Swal.fire('Tarea completada!!', 'Se registro con exito el registro', 'success');
        }
        else{
          Swal.fire("Error Servidor", datos_recibidos.mensaje, "warning");
        }
      });
    }

  }

}
