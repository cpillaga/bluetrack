import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/carrier.model';
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
  public trans: User[] = [];
  public branchOffice: string;
  public dataTrans: User = new User(null, null,null,null, null,null,null,null);
  public dataTrans1: User = new User(null, null,null,null, null,null,null,null);;
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
    this.getTrans();
  }

  public getTrans(){
    this.contTrans = 0;
    this._transService.getTrans(this.branchOffice['_id']).subscribe(data => {
       
        for (let i = 0; i < data.length; i++) {
          if (data[i].role == 'Transportista') {
            this.trans[this.contTrans] = data[i];
            this.contTrans = this.contTrans + 1;
          }
        }

      });
  }

  public getDataTrans(index){
    this.dataTrans = this.trans[index];
  }

  public questionYN(index){
    this.dataTrans1 = this.trans[index];
    const estado = this.dataTrans1['status'];

    if (estado === "true") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-info',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        text: "Seguro desea eliminar a " + this.dataTrans1.name + "?",
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
        text: "Seguro desea habilitar a " + this.dataTrans1.name + "?",
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

    let carrier = new User(
      forma.value.name,
      forma.value.email,
      forma.value.user,
      '1234',
      'Transportista',
      forma.value.phone,
      forma.value.address,
      this.branchOffice
    );

    this._transService.addTrans(carrier).subscribe((data: any) => {
      this.getTrans();
      this.closebutton.nativeElement.click();
    });
  }

  public deleteTrans(){
    let idT = this.dataTrans1._id;
   
    this._transService.deleteTrans(idT).subscribe(resp => {
      this.getTrans();
    });
  }

  public habilitaTrans(){
    let idT = this.dataTrans1._id;
  
    this._transService.habilitaTrans(idT).subscribe(resp => {
      this.getTrans();
    });
  }
}
