import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globals } from '../globals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  url:string = globals.url;

  listaClientes:any;

  constructor(private http:HttpClient, private route:Router) { }

  ngOnInit(): void {
    this.getListaClientes();
  }
  
  clickNavegarHaciaNuevoCliente(){
    this.route.navigate(['cliente/agregar']);
  }

  clickNavegarHaciaActualizarCliente(_idCliente:number){
    this.route.navigate(['cliente/editar', _idCliente]);
  }

  clickNavegarHaciaCuentasBancaria(_idCliente:number){
    this.route.navigate(['cliente/cuentas/', _idCliente]);
  }

  getListaClientes(){
    Swal.fire({title: 'Buscando registros. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    this.http.get(this.url + "cliente/listaClientes").subscribe((datos_recibidos:any) => {
      
      Swal.close();
      
      if(datos_recibidos.estado==true){
        this.listaClientes = datos_recibidos.clientes;

        for(let i =0;i<= this.listaClientes.length-1;i++){

          this.listaClientes[i].fecha_nacimiento = Date.parse((this.listaClientes[i].fecha_nacimiento));
        }

      }else{
        console.log(datos_recibidos.mensaje)
      }
    });
  }

  questionEliminarCliente(_idCliente:number){
    Swal.fire({   
      title: "Eliminación",   
      text: "¿Esta seguro de eliminar el cliente seleccionado¡?",   
      icon: 'warning',
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Eliminar",   
      cancelButtonText: "Cancelar"
    }).then((result) => {
        if(result.isConfirmed) {
          this.postEliminarCliente(_idCliente);
        }else{
            //localStorage.clear();
        }
    })
  }

  postEliminarCliente(_id:number){

    Swal.fire({title: 'Eliminando registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {

    };

    this.http.post(this.url + "cliente/eliminarCliente/" + _id, parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      if(datos_recibidos.estado==true){

        Swal.fire('Tarea completada!', 'Se elimino con exito el registro', 'success')

        this.getListaClientes();
      }
      else{
        Swal.fire("Error Servidor", datos_recibidos.mensaje, "warning");
      }
    });
  }

}
