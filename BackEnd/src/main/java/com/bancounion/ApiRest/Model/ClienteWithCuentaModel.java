package com.bancounion.ApiRest.Model;

import java.util.List;

public class ClienteWithCuentaModel extends ResultadoModel{
    private ClienteModel cliente;
    private List<CuentaDetalleModel> cuenta_detalle;

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public List<CuentaDetalleModel> getCuenta_detalle() {
        return cuenta_detalle;
    }

    public void setCuenta_detalle(List<CuentaDetalleModel> cuenta_detalle) {
        this.cuenta_detalle = cuenta_detalle;
    }
}
