package com.bancounion.ApiRest.Model;

public class ResultadoModel {
    public boolean estado;
    public String mensaje;
    public ResultadoModel(){
    }

    public ResultadoModel(boolean _estado, String _mensaje){
        this.estado = _estado;
        this.mensaje = _mensaje;
    }
}
