import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { HomeComponent } from './home/home.component';
import { DetallesComponent } from './detalles/detalles.component';
import { CardPeliComponent } from './card-peli/card-peli.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { DiarioComponent } from './diario/diario.component';
import { OrderByPipe } from './order-by.pipe';
import { CardReviewComponent } from './card-review/card-review.component';
import { KeysPipe } from './keys.pipe';
import { AuthGuard } from './auth-guard.service';
import { OrdenPipe } from './orden.pipe';
import { BarraFiltrosComponent } from './barra-filtros/barra-filtros.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReviewPublicaComponent } from './review-publica/review-publica.component';
import { AboutComponent } from './about/about.component';
import { BuzonComponent } from './buzon/buzon.component';
import { SeguidoresComponent } from './seguidores/seguidores.component';
import { SeguidosComponent } from './seguidos/seguidos.component';
import { SocialComponent } from './social/social.component';
import { CardUsuarioComponent } from './card-usuario/card-usuario.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { BarraFiltrosBuscadorComponent } from './barra-filtros-buscador/barra-filtros-buscador.component';
import { RestablecerComponent } from './restablecer/restablecer.component';
import { RestablecimientoComponent } from './restablecimiento/restablecimiento.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardReviewSeguidoComponent } from './card-review-seguido/card-review-seguido.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscadorComponent,
    HomeComponent,
    DetallesComponent,
    CardPeliComponent,
    RegistroComponent,
    LoginComponent,
    ReviewComponent,
    DiarioComponent,
    OrderByPipe,
    CardReviewComponent,
    KeysPipe,
    OrdenPipe,
    BarraFiltrosComponent,
    PerfilComponent,
    ReviewPublicaComponent,
    AboutComponent,
    BuzonComponent,
    SeguidoresComponent,
    SeguidosComponent,
    SocialComponent,
    CardUsuarioComponent,
    AjustesComponent,
    BarraFiltrosBuscadorComponent,
    RestablecerComponent,
    RestablecimientoComponent,
    PanelAdminComponent,
    CardReviewSeguidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
