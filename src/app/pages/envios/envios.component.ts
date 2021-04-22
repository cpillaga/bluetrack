import { Component, OnInit } from '@angular/core';
import { ShippingAgreementService } from '../../services/envio.service';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent implements OnInit {
  sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
  idSucursal = this.sucursal['_id'];

  constructor(
    public _enviosService: ShippingAgreementService,
  ) { }

  ngOnInit(): void {
    this.getEnvios();
  }

  getEnvios(){
    this._enviosService.getEnvios(this.idSucursal).subscribe(resp => {
      console.log(resp);
    });
  }
}
