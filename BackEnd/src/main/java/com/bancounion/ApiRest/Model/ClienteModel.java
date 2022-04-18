package com.bancounion.ApiRest.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "cliente")
public class ClienteModel {
    @Id
    private int id;
    private String nombre;
    private String apellido_paterno;
    private String apellido_materno;
    private String tipo_documento;
    private String numero_documento;
    private Date fecha_nacimiento;
    private String genero;

    public ClienteModel() {
    }

    public ClienteModel(int id, String nombre, String apellido_paterno,
                        String apellido_materno, String tipo_documento,
                        String numero_documento, Date fecha_nacimiento,
                        String genero) {
        this.setId(id);
        this.setNombre(nombre);
        this.setApellido_paterno(apellido_paterno);
        this.setApellido_materno(apellido_materno);
        this.setTipo_documento(tipo_documento);
        this.setNumero_documento(numero_documento);
        this.setFecha_nacimiento(fecha_nacimiento);
        this.setGenero(genero);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido_paterno() {
        return apellido_paterno;
    }

    public void setApellido_paterno(String apellido_paterno) {
        this.apellido_paterno = apellido_paterno;
    }

    public String getApellido_materno() {
        return apellido_materno;
    }

    public void setApellido_materno(String apellido_materno) {
        this.apellido_materno = apellido_materno;
    }

    public String getTipo_documento() {
        return tipo_documento;
    }

    public void setTipo_documento(String tipo_documento) {
        this.tipo_documento = tipo_documento;
    }

    public String getNumero_documento() {
        return numero_documento;
    }

    public void setNumero_documento(String numero_documento) {
        this.numero_documento = numero_documento;
    }

    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }
}
