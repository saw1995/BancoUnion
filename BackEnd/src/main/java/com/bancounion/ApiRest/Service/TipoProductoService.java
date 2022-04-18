package com.bancounion.ApiRest.Service;

import com.bancounion.ApiRest.Model.TipoProductoModel;
import com.bancounion.ApiRest.Repository.TipoProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class TipoProductoService {
    @Autowired
    TipoProductoRepository tipoProductoRepository;

    public List<TipoProductoModel> listaTipoProducto(){
        return (List<TipoProductoModel>) tipoProductoRepository.findAll();
    }

    public Optional<TipoProductoModel> tipoProductoById(Integer id){
        return tipoProductoRepository.findById(id);
    }
}
