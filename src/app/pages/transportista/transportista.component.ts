import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carrier } from '../../models/carrier.model';
import { GeneralService } from '../../services/general.service';
import { TransService } from '../../services/transportista.service';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styles: []
})
export class TransportistaComponent implements OnInit {
  public ciRuc: string;
  public name: string;
  public phone: string;
  public email: string;
  public password: string;
  public _id: string;
  public trans: Carrier[];
  public business: string;
  public dataTrans: Carrier = new Carrier(null, null,null,null, null,null);
  public dataTrans1: Carrier = new Carrier(null, null,null,null, null,null);;
  public showModalBox: boolean = false;

  @ViewChild('closebutton',  {static: false}) closebutton;
  
  constructor(
    public _generalService: GeneralService,
    public _transService: TransService
  ) { }

  ngOnInit() {
    this._id = localStorage.getItem('id');
    this.business = localStorage.getItem('id');
    this.getTrans();
  }

  public getTrans(){

      this._transService.getTrans(this._id).subscribe((data: any) => {
        this.trans = data;
      });
  }

  public getDataTrans(index){
    this.dataTrans = this.trans[index];
  }

  public questionYN(index){
    this.dataTrans1 = this.trans[index];
    this.showModalBox = true;
  }

  public addTrans(forma: NgForm){
    if(forma.invalid) {
      return;
    }

    let carrier = new Carrier(
      forma.value.ciRuc,
      forma.value.name,
      forma.value.phone,
      forma.value.email,
      forma.value.password,
      forma.value.business,
    );

    this._transService.addTrans(carrier).subscribe((data: any) => {
      this.getTrans();
      this.closebutton.nativeElement.click();
    });
  }

  public deleteTrans(){
    let idT = this.dataTrans1._id;
    this._transService.deleteTrans(idT);
  }
}
