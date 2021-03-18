import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/carrier.model';
import { GeneralService } from '../../services/general.service';
import { TransService } from '../../services/transportista.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: []
})
export class OperadorComponent implements OnInit {

  public name: string;
  public _id: string;
  public trans: User[] = [];
  public branchOffice: string;
  public dataTrans: User = new User(null, null,null,null, null,null,null,null);
  public dataTrans1: User = new User(null, null,null,null, null,null,null,null);;
  public showModalBox: boolean = false;
  public contTrans = 0;  
  @ViewChild('closebutton',  {static: false}) closebutton;
  
  constructor(
    public _generalService: GeneralService,
    public _transService: TransService
  ) { }

  ngOnInit(): void {
    this._id = localStorage.getItem('idBT');
    this.branchOffice = JSON.parse(localStorage.getItem('sucursalBT')) ;
    this.getOperador();
  }

  public getOperador(){
    this.contTrans = 0;
    this._transService.getTrans(this.branchOffice['_id']).subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].role == 'Operador') {
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
    this.showModalBox = true;
  }

  public addOperador(forma: NgForm){
    if(forma.invalid) {
      return;
    }

    let carrier = new User(
      forma.value.name,
      forma.value.email,
      forma.value.user,
      '1234',
      'Operador',
      forma.value.phone,
      forma.value.address,
      this.branchOffice
    );

    this._transService.addTrans(carrier).subscribe((data: any) => {
      this.getOperador();
      this.closebutton.nativeElement.click();
    });
  }

}
