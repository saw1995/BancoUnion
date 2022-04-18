package com.bancounion.ApiRest.Service;

import com.bancounion.ApiRest.Model.CuentaBancariaModel;
import com.bancounion.ApiRest.Model.CuentaBancariaResultadoModel;
import com.bancounion.ApiRest.Model.ResultadoModel;
import com.bancounion.ApiRest.Repository.CuentaBancariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CuentaBancariaService {
    @Autowired
    CuentaBancariaRepository cuentaBancariaRepository;

    public Optional<CuentaBancariaModel> cuentaBancariaById(Integer id){
        return cuentaBancariaRepository.findById(id);
    }
    public Integer selectUltimoRango(){
        int valor = cuentaBancariaRepository.selectUltimoRango();

        if(valor ==0){
            valor = 1;
        }else{
            valor = valor + 1;
        }
        return valor;
    }
    public CuentaBancariaResultadoModel guardarDatosCuentaBancaria(CuentaBancariaModel oCuenta){
        var resultado = new CuentaBancariaResultadoModel();
        resultado.estado = false;
        resultado.mensaje = "Sin Accion del servicio REST";

        try{
            Date fechaHoy = new Date();

            oCuenta.setFecha_creacion(fechaHoy);
            var resCuenta = cuentaBancariaRepository.save(oCuenta);
            resultado.setCuenta_bancaria(resCuenta);

            resultado.estado = true;
            resultado.mensaje = "Se Guardo con exitto los datos";

        }catch (Exception ex){
            resultado.estado = false;
            resultado.mensaje = "Error" + ex.getMessage();
        }
        return resultado;
    }

    public ResultadoModel eliminarCuentaBancaria(Integer id){
        try{
            cuentaBancariaRepository.deleteById(id);
            return new ResultadoModel(true,"Se elimino con exito la cuenta bancaria");
        }catch (Exception ex){
            return new ResultadoModel(false,"Error " + ex.getMessage());
        }
    }
}
