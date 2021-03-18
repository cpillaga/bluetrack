import { Component, OnInit } from '@angular/core';
import { Province } from '../../models/province.model';
import { Canton } from '../../models/canton.model';
import { GeneralService } from '../../services/general.service';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Agreement } from '../../models/agreement.model';
import { ConvenioService } from '../../services/convenio.service';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: []
})
export class ConvenioComponent implements OnInit {

  public imgTemp: any = null;
  public selectImg: File = null;
  public img: string;
  public imgEmp: string;
  public nomImg: string;

  public descripcion ="";
  public idClient = "";
  public contConv = 0;

  provincias: Province[] = [];
  cantones: Canton[] = [];
  convenios: Agreement[] = [];

  constructor(
    public _provCant: GeneralService,
    public _clienService: ClientService,
    public _convenioService: ConvenioService
  ) { }

  ngOnInit(): void {
    this.getProvincia();
    this.getConvenio();
  }

  getConvenio(){
      const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
      const idSucursal = sucursal['_id'];

      this._convenioService.getConvenio(idSucursal).subscribe(resp => {
        console.log(resp);
        this.convenios = resp.agreement;
        this.contConv = this.convenios.length;
      });
  }

  addConvenio(convenio: NgForm){
      const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
      const cantonSucursal = sucursal['canton'];
      const idSucursal = sucursal['_id'];

      if (convenio.valid && this.imgTemp != null) {
        this.getClient(convenio.value.cliente);
       

        this._provCant.subirImg(this.imgTemp).then(url => {

          const convenios: Agreement = {
            description: convenio.value.descripcion,
            price: convenio.value.precio,
            cantonOrigen: cantonSucursal,
            cantonDestino: convenio.value.canton,
            img: url,
            branchOffice: idSucursal,
            client: this.idClient
          };

          console.log(this.idClient);

          this._convenioService.addConvenio(convenios).subscribe(resp => {
            console.log(resp);
          });

        });

      }else{
        console.log("Debe llenar todos los campos");
      }
  }

  getClient(mail){
    this._clienService.getClient(mail).subscribe(resp => {
      this.idClient = resp.client[0]._id;
    });
  }

  getProvincia(){
    this._provCant.getProvincia().subscribe(correcto => {
      this.provincias = correcto;
    });
  }

  getCanton(idProv){
    this._provCant.getCanton(idProv).subscribe(correcto => {
      this.cantones = correcto;
    });
  }

  public selectImage(file: File){
    this.selectImg = file;
    this.nomImg = file.name;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }
}
