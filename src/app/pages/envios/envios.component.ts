import { Component, OnInit, ViewChild } from '@angular/core';
import { ShippingAgreementService } from '../../services/envio.service';
import { ShippingAgreement, DetailShippingAgreement } from '../../models/envio.model';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent implements OnInit {
  sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
  idSucursal = this.sucursal['_id'];

  envios: ShippingAgreement[] = [];
  detalles: DetailShippingAgreement[] = [];
  
  estados;
  EnvRastreo;

  viewDetail = false;
  viewStatus = false;
  coincidencia = true;

  constructor(
    public _enviosService: ShippingAgreementService,
  ) { }

  ngOnInit(): void {
    this.getEnvios();
  }

  getEnvios(){
    this._enviosService.getEnvios(this.idSucursal).subscribe(resp => {
      this.envios = resp;
    });
  }

  getDetalle(idEnvio){
    this._enviosService.getDetallesEnvio(idEnvio).subscribe(resp => {
      this.detalles = resp;
      this.viewDetail = true;
    });
  }

  rastrear(idClient, rastreo){
    this._enviosService.rastrearEnvio(idClient, rastreo).subscribe(resp => {
      console.log(resp);
      this.estados = resp.status;
      this.EnvRastreo = resp.shippingAgreement;
      this.viewStatus = true;
    });
  }

  searchEnvio(termino){
    if (termino == "") {
      this.coincidencia = true;
      this.getEnvios();
    }else{
      this._enviosService.searchEnvio(termino, this.idSucursal).subscribe(resp => {
        if (resp.length === 0) {
          this.coincidencia = false;  
        }else{
          console.log(resp);
          this.envios = resp;
          this.coincidencia = true;
        }
      });
    }
  }
}
