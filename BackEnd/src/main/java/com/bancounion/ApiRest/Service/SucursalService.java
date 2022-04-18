package com.bancounion.ApiRest.Service;

import com.bancounion.ApiRest.Model.SucursalModel;
import com.bancounion.ApiRest.Repository.SucursalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SucursalService {
    @Autowired
    SucursalRepository sucursalRepository;

    public List<SucursalModel> listaSucursal(){
        return (List<SucursalModel>) sucursalRepository.findAll();
    }

    public Optional<SucursalModel> sucursalById(Integer id){
        return sucursalRepository.findById(id);
    }
}
