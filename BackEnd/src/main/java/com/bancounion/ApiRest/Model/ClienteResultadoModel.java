package com.bancounion.ApiRest.Model;

public class ClienteResultadoModel extends ResultadoModel{
    private ClienteModel cliente;

    public ClienteModel getCliente() {
        return cliente;
    }
    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }
}
