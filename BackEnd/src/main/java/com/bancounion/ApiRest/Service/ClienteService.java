package com.bancounion.ApiRest.Service;

import com.bancounion.ApiRest.Model.*;
import com.bancounion.ApiRest.Repository.ClienteRepository;
import com.bancounion.ApiRest.Repository.CuentaBancariaRepository;
import com.bancounion.ApiRest.Repository.SucursalRepository;
import com.bancounion.ApiRest.Repository.TipoProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    CuentaBancariaRepository cuentaBancariaRepository;

    @Autowired
    SucursalRepository sucursalRepository;

    @Autowired
    TipoProductoService tipoProductoService;

    public ClienteResultadoModel clienteById(Integer id){
        var resultado = new ClienteResultadoModel();
        resultado.estado = false;
        resultado.mensaje = "No se ejecuto la peticion";

        try {
            resultado.setCliente(clienteRepository.findById(id).get());
            resultado.estado = true;
            resultado.mensaje = "Cliente encontrado";
        }catch (Exception ex)
        {
            resultado.estado = false;
            resultado.mensaje = "Error"+ex.getMessage();
        }
        return resultado;
    }
    public ClienteListaModel listaClientes(){
        var resultado = new ClienteListaModel();
        resultado.estado = false;
        resultado.mensaje = "Sin respuesta";

        try {
            var oClientes = (List<ClienteModel>) clienteRepository.findAll();

            resultado.setClientes(oClientes);
            resultado.estado = true;
            resultado.mensaje = "Se encontraron datos con exito";

        }catch(Exception ex){
            resultado.estado = false;
            resultado.mensaje = ex.getMessage();
        }

        return resultado;
    }

    public ClienteWithCuentaModel clienteCuentasDetalle(Integer id){
        var resultado = new ClienteWithCuentaModel();
        resultado.estado = false;
        resultado.mensaje = "Peticion ejecutada sin exito";

        try{
            var oCliente = clienteRepository.findById(id);

            if(oCliente != null){

                var oCuentas = cuentaBancariaRepository.selectCuentaByIdCliente(id);

                var listaCuentaDetalles = new ArrayList<CuentaDetalleModel>();

                for(var oCuenta:oCuentas){

                    var sucursal = sucursalRepository.findById(oCuenta.getId_sucursal());

                    var tipoProducto = tipoProductoService.tipoProductoById(oCuenta.getId_tipo_producto());

                    var cuentaDetalleAgregar = new CuentaDetalleModel();

                    cuentaDetalleAgregar.setCuenta(oCuenta);
                    cuentaDetalleAgregar.setSucursal(sucursal.get());
                    cuentaDetalleAgregar.setTipo_producto(tipoProducto.get());

                    listaCuentaDetalles.add(cuentaDetalleAgregar);
                }

                resultado.setCliente(oCliente.get());
                resultado.setCuenta_detalle(listaCuentaDetalles);

                resultado.estado = true;
                resultado.mensaje = "Datos encontrados con exito";
            }

        }catch (Exception ex){
            resultado.estado = false;
            resultado.mensaje = "Error"+ex.getMessage();
        }

        return resultado;
    }
    public ClienteResultadoModel guardarDatosCliente(ClienteModel oCliente){
        var resultado = new ClienteResultadoModel();
        resultado.estado = false;
        resultado.mensaje = "No se realizo ninguna accion";

        try{
            var resCliente = clienteRepository.save(oCliente);
            resultado.setCliente(resCliente);

            resultado.estado = true;
            resultado.mensaje = "Se guardo con éxito datos del cliente!";
        }catch (Exception ex){
            resultado.estado = false;
            resultado.mensaje = ex.getMessage();
        }

        return resultado;
    }

    public ResultadoModel eliminarCliente(Integer id){
        try{
            clienteRepository.deleteById(id);
            return new ResultadoModel(true,"Se elimino con exito el cliente");
        }catch (Exception ex){
            return new ResultadoModel(false,"Error " + ex.getMessage());
        }
    }
}
