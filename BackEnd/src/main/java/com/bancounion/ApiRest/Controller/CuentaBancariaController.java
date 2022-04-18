package com.bancounion.ApiRest.Controller;

import com.bancounion.ApiRest.Model.CuentaBancariaModel;
import com.bancounion.ApiRest.Model.CuentaBancariaResultadoModel;
import com.bancounion.ApiRest.Model.ResultadoModel;
import com.bancounion.ApiRest.Service.CuentaBancariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cuenta_bancaria")
@CrossOrigin(origins = "*")
public class CuentaBancariaController {
    @Autowired
    CuentaBancariaService cuentaBancariaService;

    @GetMapping("cuentaBancariaById/{id}")
    public CuentaBancariaModel cuentaBancariaById(@PathVariable("id")Integer id){
        return cuentaBancariaService.cuentaBancariaById(id).get();
    }

    @GetMapping("selectUltimoRango")
    public Integer selectUltimoRango(){
        return cuentaBancariaService.selectUltimoRango();
    }

    @PostMapping("guardarDatosCuentaBancaria")
    public CuentaBancariaResultadoModel guardarDatosCuentaBancaria(@RequestBody CuentaBancariaModel oCuenta){
        return cuentaBancariaService.guardarDatosCuentaBancaria(oCuenta);
    }

    @PostMapping(path = "eliminarCuentaBancaria/{id}")
    public ResultadoModel eliminarCuentaBancaria(@PathVariable("id") Integer id){
        return cuentaBancariaService.eliminarCuentaBancaria(id);
    }
}
