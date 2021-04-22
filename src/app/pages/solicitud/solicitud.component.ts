import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { GeneralService } from '../../services/general.service';
import { TransService } from '../../services/transportista.service';
import { DetailRequest } from '../../models/request.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: []
})
export class SolicitudComponent implements OnInit {

  idEmp = localStorage.getItem("idBT");
  sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
  idSucursal = this.sucursal['_id'];
  cantSuc = this.sucursal['canton'].description;
  request: Request[] = [];
  detailReq: DetailRequest;
  arrayDR: DetailRequest[] = [];

  constructor(
    // public wbSocket: WebSocketService,
    public _requestService: SolicitudService, 
    public _generalService: GeneralService,
    public _transService: TransService
  ) { 
  }

  ngOnInit() {
      this.getRequest();
  }

  getRequest(){
    this.arrayDR = [];
    this.request = [];
    this.detailReq = null;

    this._requestService.getAllRequest(this.idSucursal).subscribe(resp => {
      if (resp.length > 0) {
        this.request = resp;
      }
    });
  }


}
