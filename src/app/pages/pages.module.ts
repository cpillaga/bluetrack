import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

//Rutas
import { PAGES_ROUTES } from './pages.routes';

//Modulos
// import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { OperadorComponent } from './operador/operador.component';
import { ConvenioComponent } from './convenio/convenio.component';
import { EnviosComponent } from './envios/envios.component';


@NgModule({
    declarations: [
        PagesComponent,
        InicioComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent,
        TransportistaComponent,
        SolicitudComponent,
        OperadorComponent,
        ConvenioComponent,
        EnviosComponent,
    ],
    exports: [
        PagesComponent,
        InicioComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        // SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ]
})

export class PagesModule { }
