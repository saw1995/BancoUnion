package com.bancounion.ApiRest.Controller;

import com.bancounion.ApiRest.Model.TipoProductoModel;
import com.bancounion.ApiRest.Service.TipoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("tipo_producto")
@CrossOrigin(origins = "*")
public class TipoProductoController {
    @Autowired
    TipoProductoService tipoProductoService;

    @GetMapping
    public List<TipoProductoModel> listaTipoProducto(){
        return tipoProductoService.listaTipoProducto();
    }
}
