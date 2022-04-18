import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { globals } from '../globals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-cuentas',
  templateUrl: './cliente-cuentas.component.html',
  styleUrls: ['./cliente-cuentas.component.css']
})
export class ClienteCuentasComponent implements OnInit {

  id_cliente = this.router.snapshot.paramMap.get("id_cliente")

  url:string = globals.url;

  objCliente:any;
  listaCuentas:any;

  listaSucursales:any;
  listaTipoProductos:any;

  idSucursalCuenta:string = "";
  idTipoProductoCuenta:string = "";
  rangoMoneda:number = 0;
  saldoMonto:number = 0;

  codigoCuenta:String = "";

  correlativo:number = 0;

  oCuentaBancaria:any;

  showModalNuevaCuenta:boolean = false;
  showModalActualizar:boolean = false;

  constructor(private http:HttpClient, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSucursal();
    this.getTipoProducto();
    this.getClienteCuentasDetalle(this.id_cliente);
  }

  questionEliminarCuenta(_id:number){
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
          this.postEliminarCuentaBancaria(_id);
        }else{
            //localStorage.clear();
        }
    })
  }
  
  clickAbrirModalActualizarCuenta(_id:number){
    this.getCorrelativo();
    this.generarCodigoCuenta();
    this.getCuentaBancariaById(_id);

    this.showModalActualizar = true;  
  }

  generarCodigoCuenta(){
    this.codigoCuenta = this.idSucursalCuenta + "0-" 
    +  this.idTipoProductoCuenta + "00-" + this.rangoMoneda + "0-" + "000000" + this.correlativo;
  }

  clickModalNuevaCuenta(){
    this.getCorrelativo();
    this.generarCodigoCuenta();
    this.showModalNuevaCuenta = true;
  }

  getCorrelativo(){
    this.http.get(this.url + "cuenta_bancaria/selectUltimoRango").subscribe((datos_recibidos:any) => {
      this.correlativo = datos_recibidos;
    });
  }

  getSucursal(){
    this.http.get(this.url + "sucursal").subscribe((datos_recibidos:any) => {
      this.listaSucursales = datos_recibidos;
    });
  }

  getTipoProducto(){
    this.http.get(this.url + "tipo_producto").subscribe((datos_recibidos:any) => {
      this.listaTipoProductos = datos_recibidos;
    });
  }

  getCuentaBancariaById(_id:any){
    this.http.get(this.url + "cuenta_bancaria/cuentaBancariaById/" + _id).subscribe((datos_recibidos:any) => {
      this.oCuentaBancaria = datos_recibidos;
    });
  }

  getClienteCuentasDetalle(_idCliente:any){

    Swal.fire({title: 'Buscando datos del cliente. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    this.http.get(this.url + "cliente/clienteCuentasDetalle/" + _idCliente).subscribe((datos_recibidos:any) => {

      Swal.close();

      if(datos_recibidos.estado==true){
        this.objCliente = datos_recibidos.cliente;
        this.listaCuentas = datos_recibidos.cuenta_detalle;

        for(let i =0;i<= this.listaCuentas.length-1;i++){
          this.listaCuentas[i].cuenta.moneda_nombre = this.listaCuentas[i].cuenta.moneda == 0 ? "Bolivianos" :"Dolares";
        }
      }
      else{
        Swal.fire("Error servidor", datos_recibidos.mensaje, "warning");
      }
    });
  }

  postEliminarCuentaBancaria(_id:number){

    Swal.fire({title: 'Eliminando registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {

    };

    this.http.post(this.url + "cuenta_bancaria/eliminarCuentaBancaria/" + _id, parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      if(datos_recibidos.estado==true){

        Swal.fire('Tarea completada!', 'Se elimino con exito el registro', 'success')

        this.getClienteCuentasDetalle(this.id_cliente);
      }
      else{
        Swal.fire("Error Servidor", datos_recibidos.mensaje, "warning");
      }
    });
  }

  postAgregarNuevaCuenta(){

    Swal.fire({title: 'Guardando nuevo registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.idSucursalCuenta == ""){
      Swal.fire("Campo no valido", "Debe seleccionar el campo SUCURSAL, intente nuevamente", "warning");
    }
    else if(this.idTipoProductoCuenta == ""){
      Swal.fire("Campo no valido", "Debe seleccionar el campo TIPO PRODUCTO, intente nuevamente", "warning");
    }
    else{

      let parametros = {
        id_cliente:this.id_cliente,
        id_sucursal:this.idSucursalCuenta,
        id_tipo_producto:this.idTipoProductoCuenta,
        numero_cuenta:this.codigoCuenta,
        moneda:this.rangoMoneda,
        monto:this.saldoMonto
      };

      this.http.post(this.url + "cuenta_bancaria/guardarDatosCuentaBancaria", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        if(datos_recibidos.estado == true){
          
          this.getClienteCuentasDetalle(this.id_cliente);

          this.idSucursalCuenta = "";
          this.idTipoProductoCuenta = ""
          this.codigoCuenta = "";
          this.rangoMoneda = 0;
          this.saldoMonto = 0;

          Swal.fire('Tarea completada!!', 'Se agrego con exito el registro', 'success');
        }
        else{
          Swal.fire("Error Servidor", datos_recibidos.mensaje, "warning");
        }
      });
    }
  }


  postActualizarCuentaBancaria(){

    Swal.fire({title: 'Guardando nuevos registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.oCuentaBancaria.id_sucursal == ""){
      Swal.fire("Campo no valido", "Debe seleccionar el campo SUCURSAL, intente nuevamente", "warning");
    }
    else if(this.oCuentaBancaria.id_tipo_producto == ""){
      Swal.fire("Campo no valido", "Debe seleccionar el campo TIPO PRODUCTO, intente nuevamente", "warning");
    }
    else{

      let parametros = {
        id:this.oCuentaBancaria.id,
        id_cliente:this.oCuentaBancaria.id_cliente,
        id_sucursal:this.oCuentaBancaria.id_sucursal,
        id_tipo_producto:this.oCuentaBancaria.id_tipo_producto,
        numero_cuenta:this.oCuentaBancaria.numero_cuenta,
        moneda:this.oCuentaBancaria.moneda,
        monto:this.oCuentaBancaria.monto
      };

      this.http.post(this.url + "cuenta_bancaria/guardarDatosCuentaBancaria", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        if(datos_recibidos.estado == true){
          
          this.getClienteCuentasDetalle(this.id_cliente);

          Swal.fire('Tarea completada!!', 'Se agrego con exito el registro', 'success');
        }
        else{
          Swal.fire("Error Servidor", datos_recibidos.mensaje, "warning");
        }
      });
    }
  }


}
