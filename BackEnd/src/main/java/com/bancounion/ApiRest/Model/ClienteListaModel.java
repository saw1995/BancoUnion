package com.bancounion.ApiRest.Model;

import java.util.List;

public class ClienteListaModel extends ResultadoModel{
    private List<ClienteModel> clientes;

    public List<ClienteModel> getClientes() {
        return clientes;
    }

    public void setClientes(List<ClienteModel> clientes) {
        this.clientes = clientes;
    }
}