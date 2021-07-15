import { Component, OnInit, ViewChild } from '@angular/core';
import { Province } from '../../models/province.model';
import { Canton } from '../../models/canton.model';
import { GeneralService } from '../../services/general.service';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Agreement } from '../../models/agreement.model';
import { ConvenioService } from '../../services/convenio.service';

import Swal from 'sweetalert2';

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

  public updData = false;

  contBtnUpd = 0;

  provincia: string;
  pidProv: string;

  canton: string;
  pidCant: string;

  convenioUpd: Agreement;
  provincias: Province[] = [];
  cantones: Canton[] = [];
  convenios: Agreement[] = [];

  idConvenio: string;

  public estadoBtnAdd = false;

  @ViewChild('closebutton',  {static: false}) closebutton;
  @ViewChild('closebuttonUpd',  {static: false}) closebuttonUpd;

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
        this.convenios = resp.agreement;
        this.contConv = this.convenios.length;
      });
  }

  addConvenio(convenio: NgForm){
    this.estadoBtnAdd = true;

    const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    const cantonSucursal = sucursal['canton'];
    const idSucursal = sucursal['_id'];

    if (convenio.valid && this.imgTemp != null) {
      this.getClient(convenio.value.cliente);

      setTimeout(() => {
        
        if (this.idClient == "") {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El cliente no existe!'
          });
        }else{
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
  
            this._convenioService.addConvenio(convenios).subscribe(resp => {
              this.getConvenio();
              this.closebutton.nativeElement.click();
              this.estadoBtnAdd = false;
            }, (err) => {
              console.log(err);
            });
          });
        }
      }, 1000);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
  }

  
  updConvenio(convenio: NgForm){
    this.estadoBtnAdd = true;

    this.contBtnUpd += 1;

    const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    const cantonSucursal = sucursal['canton'];
    const idSucursal = sucursal['_id'];

    if (convenio.valid && this.imgTemp != null) {
      this._clienService.getClient(convenio.value.cliente).subscribe(resp => {
        if (resp.client.length === 0) {
          this.idClient = "";
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El cliente no existe!'
          });
        }else{
          this.idClient = resp.client[0]._id;

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

            this._convenioService.updConvenio(this.idConvenio, convenios).subscribe(resp1 => {
              this.getConvenio();
              this.closebuttonUpd.nativeElement.click();
              this.estadoBtnAdd = false;
            }, (err) => {
              console.log(err);
            });
          });

        }
     });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
  }

  getClient(mail){
    this._clienService.getClient(mail).subscribe(resp => {
      if (resp.client.length === 0) {
        this.idClient = "";
      }else{
        this.idClient = resp.client[0]._id;
      }
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

  getData(convenio: Agreement){
    this.convenioUpd = convenio;
    
    console.log(this.convenioUpd);

    this.provincia = this.convenioUpd.cantonDestino['province'].descripcion;
    this.pidProv = this.convenioUpd.cantonDestino['province']._id;

    this.getCanton(this.pidProv);

    this.canton = this.convenioUpd.cantonDestino['description'];
    this.pidCant = this.convenioUpd.cantonDestino['_id'];
    
    this.imgTemp = convenio.img;
    this.updData = true;
    this.idConvenio = convenio._id;
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

  public quesetionYN(idConv, desc, status){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    let texto = "";
    let estado = "";

    if (status == "Inactivo") {
      texto = "habilitar";
      estado = "Activo";
    }else{
      texto = "eliminar";
      estado = "Inactivo";
    }

    swalWithBootstrapButtons.fire({
      text: "Seguro desea " + texto + " convenio de " + desc + "?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#2E57A6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._convenioService.delConvenio(idConv, estado).subscribe(resp => {
          this.getConvenio();
        });
      }
    });
  }
}
