import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { PerfilComponent } from './perfil/perfil.component';
import { ReviewPublicaComponent } from './review-publica/review-publica.component';
import { AboutComponent } from './about/about.component';
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
import { CardReviewLastactivityComponent } from './card-review-lastactivity/card-review-lastactivity.component';
import { CardPeliBdComponent } from './card-peli-bd/card-peli-bd.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DetallesReviewedSeguidoComponent } from './detalles-reviewed-seguido/detalles-reviewed-seguido.component';
import { DetallesReviewedComponent } from './detalles-reviewed/detalles-reviewed.component';
import { AjustesPersonalizarComponent } from './ajustes-personalizar/ajustes-personalizar.component';
import { AjustesBarraProgresoComponent } from './ajustes-barra-progreso/ajustes-barra-progreso.component';
import { AjustesFotoPerfilComponent } from './ajustes-foto-perfil/ajustes-foto-perfil.component';
import { AjustesCambiarPwordComponent } from './ajustes-cambiar-pword/ajustes-cambiar-pword.component';
import { AjustesBorrarCuentaComponent } from './ajustes-borrar-cuenta/ajustes-borrar-cuenta.component';
import { PanelAdminPendienteComponent } from './panel-admin-pendiente/panel-admin-pendiente.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { TraduccionService } from './traduccion.service';
import { AboutProfileCardComponent } from './about-profile-card/about-profile-card.component';
import { DetallesUsuarioComponent } from './detalles-usuario/detalles-usuario.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { HomeOpinionesComponent } from './home-opiniones/home-opiniones.component';
import { DetallesServiciosComponent } from './detalles-servicios/detalles-servicios.component';
import { DetallesStatsComponent } from './detalles-stats/detalles-stats.component';

registerLocaleData(localeEs);
registerLocaleData(localeEn);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscadorComponent,
    HomeComponent,
    DetallesComponent,
    DetallesReviewedComponent,
    DetallesReviewedSeguidoComponent,
    CardPeliComponent,
    RegistroComponent,
    LoginComponent,
    ReviewComponent,
    DiarioComponent,
    OrderByPipe,
    CardReviewComponent,
    KeysPipe,
    OrdenPipe,
    PerfilComponent,
    ReviewPublicaComponent,
    AboutComponent,
    SeguidoresComponent,
    SeguidosComponent,
    SocialComponent,
    CardUsuarioComponent,
    AjustesComponent,
    AjustesPersonalizarComponent,
    AjustesBarraProgresoComponent,
    AjustesFotoPerfilComponent,
    BarraFiltrosBuscadorComponent,
    RestablecerComponent,
    RestablecimientoComponent,
    PanelAdminComponent,
    CardReviewSeguidoComponent,
    CardReviewLastactivityComponent,
    CardPeliBdComponent,
    AjustesCambiarPwordComponent,
    AjustesBorrarCuentaComponent,
    PanelAdminPendienteComponent,
    AboutProfileCardComponent,
    DetallesUsuarioComponent,
    HomeCarouselComponent,
    HomeOpinionesComponent,
    DetallesServiciosComponent,
    DetallesStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      deps: [TraduccionService], // depend on TraduccionService
      useFactory: (traduccionService: TraduccionService) =>
        traduccionService.getDefaultLanguage(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
