package com.bancounion.ApiRest.Model;

public class CuentaBancariaResultadoModel extends ResultadoModel{
    private CuentaBancariaModel cuenta_bancaria;

    public CuentaBancariaModel getCuenta_bancaria() {
        return cuenta_bancaria;
    }

    public void setCuenta_bancaria(CuentaBancariaModel cuenta_bancaria) {
        this.cuenta_bancaria = cuenta_bancaria;
    }
}
