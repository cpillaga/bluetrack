import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';

import { AutenticacionService } from './services/autenticacion.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from './services/general.service';
import { TransService } from './services/transportista.service';
import { WebSocketService } from './services/websocket.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { URL_SERVICE } from './config/config';
import { SolicitudService } from './services/solicitud.service';
import { ClientService } from './services/client.service';
import { ConvenioService } from './services/convenio.service';

const config: SocketIoConfig = { url: URL_SERVICE.ws, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AutenticacionService,
    GeneralService,
    TransService,
    SolicitudService,
    WebSocketService,
    ClientService,
    ConvenioService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
