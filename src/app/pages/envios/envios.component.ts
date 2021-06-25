import { Component, OnInit, ViewChild } from '@angular/core';
import { ShippingAgreementService } from '../../services/envio.service';
import { ShippingAgreement, DetailShippingAgreement } from '../../models/envio.model';

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

  viewDetail = false;

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
}
