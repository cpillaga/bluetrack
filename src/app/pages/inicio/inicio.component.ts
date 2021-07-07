import { Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { SolicitudService } from '../../services/solicitud.service';
import { DetailRequest, Request } from '../../models/request.model';
import { GeneralService } from '../../services/general.service';
import { TransService } from '../../services/transportista.service';
import { Form, NgForm } from '@angular/forms';
import { Carrier } from '../../models/carrier.model';
import { ShippingAgreement, DetailShippingAgreement, StatusShippingAgreement } from '../../models/envio.model';
import { ShippingAgreementService } from '../../services/envio.service';
import moment = require('moment');

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {

  idEmp = localStorage.getItem("idBT");
  sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
  idSucursal = this.sucursal['_id'];
  cantSuc = this.sucursal['canton'].description;


  envios: ShippingAgreement[] = [];
  detalleEnvio: DetailShippingAgreement[] = [];


  empresa = JSON.parse(localStorage.getItem("empresaBT"));
  idEmpr = this.empresa['_id'];

  selectrequest: Request;
  request: Request[] = [];
  detailReq: DetailRequest[] = [];
  arrayDR: DetailRequest[] = [];
  dataDetalle: boolean = false;
  idReq: string = "";

  carriers: Carrier[] = [];
  guide: string = "";

  @ViewChild('closebuttonacce',  {static: false}) closebuttonacce;
  @ViewChild('closebuttonaden',  {static: false}) closebuttonaden;
  constructor(
    // public wbSocket: WebSocketService,
    public _requestService: SolicitudService, 
    public _generalService: GeneralService,
    public _transService: TransService,
    public _envioService: ShippingAgreementService
  ) {
  }

  ngOnInit() {
      this.getRequest();
      this.getTransDisp();
      this.getEnviosHoy();

      // 2021-05-20T18:10:23.182Z
      // 2021-05-20T12:26:29.440+00:00


  }

  getRequest(){
    this.arrayDR = [];
    this.request = [];

    this._requestService.getRequestPendiente(this.idSucursal).subscribe(resp => {
      if (resp.length > 0) {
        this.request = resp;
      }
    });
  }

  getDetalle(request){
    this.detailReq = [];

    this.selectrequest = request;

    this._requestService.getDetailRequest(this.selectrequest._id).subscribe(resp => {
      this.detailReq = resp;
      this.dataDetalle = true;
    });
  }

  accept(form: NgForm){
    const rastreo = this.generateCode();
    // let dateA = new Date().toISOString();

    const fecha = moment().format('YYYY-MM-DD');
    const hora = moment().format('HH:mm:ss');

    const dateA = fecha+"T"+hora+".182Z";

    const envio: ShippingAgreement = {
      date: dateA,
      subtotal: this.selectrequest.subtotal,
      iva: this.selectrequest.iva,
      total: this.selectrequest.total,
      status: 'Pendiente',
      guide: this.selectrequest.guide,
      type: 'convenio',
      tracking: rastreo,
      carrier: form.value.transportista,
      client: this.selectrequest.client["_id"],
      branchOffice: this.selectrequest.branchOffice["_id"],
      receiver: this.selectrequest.receiver["_id"]
    };

    this.addEnvio(envio);
  }

  addEnvio(envio: ShippingAgreement){
    
    this._envioService.addShipping(envio).subscribe(resp => {
      let contDet = 0;

      for (let i = 0; i < this.detailReq.length; i++) {
        let detalle: DetailShippingAgreement = {
          description: this.detailReq[i].description,
          quantity: this.detailReq[i].quantity,
          price: this.detailReq[i].price,
          total: this.detailReq[i].total,
          img: this.detailReq[i].img,
          shippingAgreement: resp._id
        };

        this._envioService.addDetailShipping(detalle).subscribe(respDetalle => {
          let estado: StatusShippingAgreement = {
            description: 'Pendiente',
            date: resp.date,
            shippingAgreement: resp._id
          };

          contDet = contDet + 1;

          if (contDet === this.detailReq.length) {
            this._envioService.addStatus(estado).subscribe(respStatus => {
              this._requestService.changeStatus(this.selectrequest._id, 'Aceptado').subscribe(respRe => {

                const mensaje = `Su solicitud ha sido aprobada. <br><br> Código de rastreo: ${envio.tracking}`;

                let envioMensaje = {
                    destinatario: this.selectrequest.client['email'],
                    asunto: 'Solicitud Aprobada',
                    mensaje
                };

                this._generalService.sendMsj(envioMensaje).subscribe(respMsj => {
                  this.getRequest();
                  this.closebuttonacce.nativeElement.click();
                });
              });
            });
          }
        });
      }

    });
  }


  denied(){
    console.log("aca");
    console.log(this.idReq);
  }

  getTransDisp(){
    this._transService.getTransDisp(this.idEmpr).subscribe(resp => {
      this.carriers = resp;
    });
  }

  generateCode(): string{
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ123467890";
    var contraseña = "";

    for (let i=0; i<10; i++){
      contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
    } 

    return contraseña;
  }

  getEnviosHoy(){
    this._envioService.getEnviosHoy(this.idSucursal).subscribe(resp => {
      this.envios = resp;
    });
  }

  getDetalleEnvio(idEnvio){
    this._envioService.getDetallesEnvio(idEnvio).subscribe(resp => {
      this.detalleEnvio = resp;
    });
  }
}
