import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';            
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './estructura/header/header.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { NavbarComponent } from './estructura/navbar/navbar.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { DetallesComponent } from './paginas/detalles/detalles.component';
import { ListaMultimediasComponent } from './paginas/lista-multimedias/lista-multimedias.component';
import { RegistrarMultimediaComponent } from './paginas/registrar-multimedia/registrar-multimedia.component';
import { DetallesMultimediaComponent } from './paginas/detalles-multimedia/detalles-multimedia.component';
import { ActualizarMultimediaComponent } from './paginas/actualizar-multimedia/actualizar-multimedia.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { RegistroUsuarioComponent } from './paginas/registro-usuario/registro-usuario.component';
import { ConfiguracionComponent } from './paginas/menuSuperior/configuracion/configuracion.component';
import { PruebasLocComponent } from './paginas/menuSuperior/pruebas-loc/pruebas-loc.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    InicioComponent,
    LoginComponent,
    DetallesComponent,
    ListaMultimediasComponent,
    RegistrarMultimediaComponent,
    DetallesMultimediaComponent,
    ActualizarMultimediaComponent,
    RegistroUsuarioComponent,
    ConfiguracionComponent,
    PruebasLocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
