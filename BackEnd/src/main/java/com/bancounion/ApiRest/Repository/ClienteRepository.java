package com.bancounion.ApiRest.Repository;
import com.bancounion.ApiRest.Model.ClienteModel;
import com.bancounion.ApiRest.Model.SucursalModel;
import org.springframework.data.repository.CrudRepository;
public interface ClienteRepository extends CrudRepository<ClienteModel, Integer> {
}
