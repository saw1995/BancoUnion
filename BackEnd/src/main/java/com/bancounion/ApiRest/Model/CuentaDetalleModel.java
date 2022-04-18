package com.bancounion.ApiRest.Model;

public class CuentaDetalleModel {
    private CuentaBancariaModel cuenta;
    private SucursalModel sucursal;
    private TipoProductoModel tipo_producto;

    public CuentaBancariaModel getCuenta() {
        return cuenta;
    }

    public void setCuenta(CuentaBancariaModel cuenta) {
        this.cuenta = cuenta;
    }

    public SucursalModel getSucursal() {
        return sucursal;
    }

    public void setSucursal(SucursalModel sucursal) {
        this.sucursal = sucursal;
    }

    public TipoProductoModel getTipo_producto() {
        return tipo_producto;
    }

    public void setTipo_producto(TipoProductoModel tipo_producto) {
        this.tipo_producto = tipo_producto;
    }
}
