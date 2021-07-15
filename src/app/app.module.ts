import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';

import { OperatorService } from './services/operator.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from './services/general.service';
import { TransService } from './services/transportista.service';
import { WebSocketService } from './services/websocket.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { URL_SERVICE } from './config/config';
import { SolicitudService } from './services/solicitud.service';
import { ClientService } from './services/client.service';
import { ConvenioService } from './services/convenio.service';
import { ShippingAgreementService } from './services/envio.service';
import { RutasService } from './services/rutas.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    OperatorService,
    GeneralService,
    TransService,
    SolicitudService,
    WebSocketService,
    ClientService,
    ConvenioService,
    ShippingAgreementService,
    RutasService,
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
