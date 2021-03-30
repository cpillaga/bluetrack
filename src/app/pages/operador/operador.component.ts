import { Component, OnInit, ViewChild } from '@angular/core';
import { Operator } from '../../models/operator.model';
import { GeneralService } from '../../services/general.service';
import { NgForm } from '@angular/forms';
import { OperatorService } from '../../services/operator.service';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: []
})
export class OperadorComponent implements OnInit {

  public name: string;
  public _id: string;
  public operator: Operator[] = [];
  public branchOffice: string;
  public dataOperator: Operator = new Operator(null, null,null,null, null,null,null,null);
  public dataOperator1: Operator = new Operator(null, null,null,null, null,null,null,null);;
  public showModalBox: boolean = false;
  public contTrans = 0;  
  
  @ViewChild('closebutton',  {static: false}) closebutton;
  
  constructor(
    public _generalService: GeneralService,
    public _operatorService: OperatorService
  ) { }

  ngOnInit(): void {
    this._id = localStorage.getItem('idBT');
    this.branchOffice = JSON.parse(localStorage.getItem('sucursalBT')) ;
    this.getOperador();
  }

  public getOperador(){
    this.contTrans = 0;
    this._operatorService.getOperator(this.branchOffice['_id']).subscribe(data => {
        this.operator = data;
        this.contTrans = data.length;
      });
  }

  public getDataOperator(index){
    this.dataOperator = this.operator[index];
  }

  public questionYN(index){
    this.dataOperator1 = this.operator[index];
    this.showModalBox = true;
  }

  public addOperador(forma: NgForm){
    if(forma.invalid) {
      return;
    }

    let operator = new Operator(
      forma.value.name,
      forma.value.email,
      forma.value.user,
      '1234',
      'Operador',
      forma.value.phone,
      forma.value.address,
      this.branchOffice
    );

    this._operatorService.addOperator(operator).subscribe((data: any) => {
      this.getOperador();
      this.closebutton.nativeElement.click();
    });
  }

}
