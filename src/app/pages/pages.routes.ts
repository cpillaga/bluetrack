import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { OperadorComponent } from './operador/operador.component';
import { ConvenioComponent } from './convenio/convenio.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { EnviosComponent } from './envios/envios.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: InicioComponent },
            { path: 'carrier', component: TransportistaComponent},
            { path: 'operador', component: OperadorComponent},
            { path: 'convenio', component: ConvenioComponent},
            { path: 'solicitud', component: SolicitudComponent},
            { path: 'envio', component: EnviosComponent},
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
