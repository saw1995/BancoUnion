import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { ClienteAgregarComponent } from './Components/cliente-agregar/cliente-agregar.component';
import { ClienteEditarComponent } from './Components/cliente-editar/cliente-editar.component';
import { ClienteCuentasComponent } from './Components/cliente-cuentas/cliente-cuentas.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteAgregarComponent,
    ClienteEditarComponent,
    ClienteCuentasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
