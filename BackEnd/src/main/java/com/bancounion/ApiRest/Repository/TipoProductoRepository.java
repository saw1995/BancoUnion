package com.bancounion.ApiRest.Repository;
import com.bancounion.ApiRest.Model.SucursalModel;
import com.bancounion.ApiRest.Model.TipoProductoModel;
import org.springframework.data.repository.CrudRepository;
public interface TipoProductoRepository extends CrudRepository<TipoProductoModel, Integer> {
}