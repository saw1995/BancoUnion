package com.bancounion.ApiRest.Controller;

import com.bancounion.ApiRest.Model.*;
import com.bancounion.ApiRest.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cliente")
@CrossOrigin(origins = "*")
public class ClienteController {
    @Autowired
    ClienteService clienteService;

    @GetMapping("clienteById/{id}")
    public ClienteResultadoModel clienteById(@PathVariable("id")Integer id){
        return clienteService.clienteById(id);
    }

    @GetMapping("listaClientes")
    public ClienteListaModel listaClientes(){
        return clienteService.listaClientes();
    }

    @GetMapping("clienteCuentasDetalle/{id_cliente}")
    public ClienteWithCuentaModel clienteCuentasDetalle(@PathVariable("id_cliente") Integer id){
        return clienteService.clienteCuentasDetalle(id);
    }

    @PostMapping("guardarDatosCliente")
    public ClienteResultadoModel guardarDatosCliente(@RequestBody ClienteModel oCliente){
        return clienteService.guardarDatosCliente(oCliente);
    }

    @PostMapping(path = "eliminarCliente/{id}")
    public ResultadoModel eliminarCliente(@PathVariable("id") Integer id){
        return clienteService.eliminarCliente(id);
    }

}
