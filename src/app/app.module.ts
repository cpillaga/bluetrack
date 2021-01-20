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
    HttpClientModule
  ],
  providers: [
    AutenticacionService,
    GeneralService,
    TransService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
