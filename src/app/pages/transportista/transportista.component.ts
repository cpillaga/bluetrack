import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carrier } from '../../models/carrier.model';
import { GeneralService } from '../../services/general.service';
import { TransService } from '../../services/transportista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styles: []
})
export class TransportistaComponent implements OnInit {
  
  public name: string;
  public _id: string;
  public trans: Carrier[] = [];
  public branchOffice: string;
  public business: string;
  public dataCarrier: Carrier = new Carrier(null, null,null,null, null,null,null,null);
  public dataCarrier1: Carrier = new Carrier(null, null,null,null, null,null,null,null);;
  public showModalBox: boolean = false;
  public texto: string;

  public contTrans = 0;  
  @ViewChild('closebutton',  {static: false}) closebutton;
  
  constructor(
    public _generalService: GeneralService,
    public _transService: TransService
  ) { }

  ngOnInit() {
    this._id = localStorage.getItem('idBT');
    this.branchOffice = JSON.parse(localStorage.getItem('sucursalBT')) ;
    this.business = JSON.parse(localStorage.getItem('empresaBT')) ;
    this.getTrans();
  }

  public getTrans(){
    this.contTrans = 0;
    this._transService.getTrans(this.business['_id']).subscribe(data => {
       
        for (let i = 0; i < data.length; i++) {
          if (data[i].role == 'Transportista') {
            this.trans[this.contTrans] = data[i];
            this.contTrans = this.contTrans + 1;
          }
        }

      });
  }

  public getDataCarrier(index){
    this.dataCarrier = this.trans[index];
  }

  public questionYN(index){
    this.dataCarrier1 = this.trans[index];
    const estado = this.dataCarrier1['status'];

    if (estado === "true") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-info',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        text: "Seguro desea eliminar a " + this.dataCarrier1.name + "?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        confirmButtonColor: '#2E57A6',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTrans();
        }
      });
    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-info',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        text: "Seguro desea habilitar a " + this.dataCarrier1.name + "?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        confirmButtonColor: '#2E57A6',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.habilitaTrans();
        }
      });
    }

  }

  public addTrans(forma: NgForm){
    if(forma.invalid) {
      return;
    }

    let carrier = new Carrier(
      forma.value.name,
      forma.value.email,
      forma.value.user,
      '1234',
      'Transportista',
      forma.value.phone,
      forma.value.address,
      this.business
    );

    this._transService.addTrans(carrier).subscribe((data: any) => {
      this.getTrans();
      this.closebutton.nativeElement.click();
    });
  }

  public deleteTrans(){
    let idT = this.dataCarrier1._id;

    this._transService.deleteTrans(idT).subscribe(resp => {
      this.getTrans();
    });
  }

  public habilitaTrans(){
    let idT = this.dataCarrier1._id;

    this._transService.habilitaTrans(idT).subscribe(resp => {
      this.getTrans();
    });
  }
}
