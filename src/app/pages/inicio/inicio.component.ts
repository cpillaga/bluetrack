import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { SolicitudService } from '../../services/solicitud.service';
import { DetailRequest, Request } from '../../models/request.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {

  idEmp = localStorage.getItem("idBT");
  sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
  idSucursal = this.sucursal['_id'];
  request: Request[] = [];
  detailReq: DetailRequest;
  arrayDR: DetailRequest[] = [];

  constructor(
    // public wbSocket: WebSocketService,
    public _requestService: SolicitudService
  ) { 
  }

  ngOnInit() {

    // this._requestService.setSolicitud();

    // setTimeout(() => {
      // this._requestService.getSolicitudWS();

      this.getRequest();
    // }, 500);
  }

  getRequest(){
    this.arrayDR = [];
    this.request = [];
    this.detailReq = null;

    this._requestService.getRequestPendiente(this.idSucursal).subscribe(resp => {
      this.request = resp;

      for (let i = 0; i < this.request.length; i++) {
        this._requestService.getDetailRequest(this.request[i]._id).subscribe(resp1 => {
          this.detailReq = resp1;

          for (let j = 0; j < resp1.length; j++) {
            this.arrayDR.push(resp1[j]);
          }
        });
      }
    });
  }

}
