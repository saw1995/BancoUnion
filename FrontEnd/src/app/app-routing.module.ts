import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { ClienteAgregarComponent } from './Components/cliente-agregar/cliente-agregar.component';
import { ClienteEditarComponent } from './Components/cliente-editar/cliente-editar.component';
import { ClienteCuentasComponent } from './Components/cliente-cuentas/cliente-cuentas.component';

const routes: Routes = 
[
  { path: 'cliente', component: ClienteComponent},
  { path: 'cliente/agregar', component: ClienteAgregarComponent},
  { path: 'cliente/editar/:id_cliente', component: ClienteEditarComponent},
  { path: 'cliente/cuentas/:id_cliente', component: ClienteCuentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
