package com.bancounion.ApiRest.Controller;

import com.bancounion.ApiRest.Model.SucursalModel;
import com.bancounion.ApiRest.Service.SucursalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sucursal")
@CrossOrigin(origins = "*")
public class SucursalController {
    @Autowired
    SucursalService sucursalService;

    @GetMapping
    public List<SucursalModel> listaSucursal(){
        return sucursalService.listaSucursal();
    }
}
