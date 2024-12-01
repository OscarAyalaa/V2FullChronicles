import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { ListaMultimediasComponent } from './paginas/lista-multimedias/lista-multimedias.component';
import { RegistrarMultimediaComponent } from './paginas/registrar-multimedia/registrar-multimedia.component';
import { DetallesMultimediaComponent } from './paginas/detalles-multimedia/detalles-multimedia.component';
import { ActualizarMultimediaComponent } from './paginas/actualizar-multimedia/actualizar-multimedia.component';

const routes: Routes = [
  {path: '', redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'lista-multimedias', component: ListaMultimediasComponent},
  {path: 'registrar-multimedia', component: RegistrarMultimediaComponent},
  {path: 'detalles-multimedia/:id', component: DetallesMultimediaComponent},
  {path: 'actualizar-multimedia/:id', component: ActualizarMultimediaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
