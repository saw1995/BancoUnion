import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globals } from '../globals';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent implements OnInit {

  url:string=globals.url;

  id_cliente = this.router.snapshot.paramMap.get("id_cliente")

  objCliente:any;

  constructor(private http:HttpClient, private route:Router, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getClienteById(this.id_cliente);
  }

  getClienteById(_id:any){
    Swal.fire({title: 'Buscando datos del cliente. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    this.http.get(this.url + "cliente/clienteById/" + _id).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      if(datos_recibidos.estado==true){

        var fecha = new Date(datos_recibidos.cliente.fecha_nacimiento);

        this.objCliente = datos_recibidos.cliente;

        let rangoMes = "";
        if(fecha.getMonth()<10){
          rangoMes = "0"+(fecha.getMonth()+1);
        }
        else{
          rangoMes = (fecha.getMonth()+1).toString();
        }

        this.objCliente.fecha_nacimiento = fecha.getFullYear()+'-'+rangoMes+'-'+(fecha.getDate());

      }else{
        console.log(datos_recibidos.mensaje)
      }
    });
  }

  postActualizarCliente(){

    Swal.fire({title: 'Guardando nuevo registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.objCliente.nombre == ""){
      Swal.fire("Campo vacío", "El campo NOMBRE no puede estar vacío, intente nuevamente", "warning");
    }
    else if(this.objCliente.apellido_paterno == ""){
      Swal.fire("Campo vacío", "El campo APELLIDO PATERNO no puede estar vacío, intente nuevamente", "warning");
    }
    else if(this.objCliente.numero_documento == ""){
      Swal.fire("Campo vacío", "El campo NUMERO DE DOCUMENTO no puede estar vacío, intente nuevamente", "warning");
    }
    else if(this.objCliente.tipo_documento == "" || this.objCliente.genero == ""){
      Swal.fire("Campo vacío", "Debe selecionar el tipo de documento o el genero, intente nuevamente", "warning");
    }
    else{

      this.http.post(this.url + "cliente/guardarDatosCliente", this.objCliente).subscribe((datos_recibidos:any) => {
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

  navegarHaciaListaClientes(){
    this.route.navigate(['cliente']);
  }

}
