import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DetallesComponent } from './detalles/detalles.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { DiarioComponent } from './diario/diario.component';
import { AuthGuard } from './auth-guard.service';
import { PerfilComponent } from './perfil/perfil.component';
import { ReviewPublicaComponent } from './review-publica/review-publica.component';
import { AboutComponent } from './about/about.component';
import { SeguidoresComponent } from './seguidores/seguidores.component';
import { SeguidosComponent } from './seguidos/seguidos.component';
import { SocialComponent } from './social/social.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { BarraFiltrosBuscadorComponent } from './barra-filtros-buscador/barra-filtros-buscador.component';
import { RestablecerComponent } from './restablecer/restablecer.component';
import { RestablecimientoComponent } from './restablecimiento/restablecimiento.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'query', component: BuscadorComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details/:id', component: DetallesComponent },
  {
    path: 'review/:username/:id',
    component: ReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'journal/:username',
    component: DiarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:username',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reviewed/:username/:id', component: ReviewPublicaComponent },
  { path: 'about/:username', component: AboutComponent },
  { path: 'about/:username/followers', component: SeguidoresComponent },
  { path: 'about/:username/following', component: SeguidosComponent },
  {
    path: 'social',
    component: SocialComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: AjustesComponent, canActivate: [AuthGuard] },
  { path: 'search', component: BarraFiltrosBuscadorComponent },
  { path: 'reset', component: RestablecerComponent },
  { path: 'reset/:token', component: RestablecimientoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
