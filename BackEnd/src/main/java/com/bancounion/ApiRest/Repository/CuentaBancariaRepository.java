package com.bancounion.ApiRest.Repository;

import com.bancounion.ApiRest.Model.CuentaBancariaModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface CuentaBancariaRepository extends CrudRepository<CuentaBancariaModel, Integer> {

    @Query(value = "SELECT * FROM cuenta_bancaria WHERE id_cliente=:id_cliente", nativeQuery = true)
    public List<CuentaBancariaModel> selectCuentaByIdCliente(@Param("id_cliente") Integer id_cliente);

    @Query(value = "SELECT MAX(id) FROM cuenta_bancaria", nativeQuery = true)
    public Integer selectUltimoRango();
}
