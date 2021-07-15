import { Component, OnInit, ViewChild } from '@angular/core';
import { Operator } from 'src/app/models/operator.model';
import { OperatorService } from '../../services/operator.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  name = "";
  
  operador: Operator;
  passwordAnt: string = "";

  @ViewChild('closebutton',  {static: false}) closebutton;

  constructor(
    public _operator: OperatorService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getMiPerfil();
  }

  getMiPerfil(){
    let idOpe = localStorage.getItem('idBT');

    this._operator.getMiPerfil(idOpe).subscribe(resp => {
      this.operador = resp[0];
    });
  }

  updPerfil(forma: NgForm){
    this._operator.updPerfil(forma.value).subscribe(resp => {
      if (resp.ok === true) {
        this.toastr.success('Modificado Correctamente', 'Correcto');
      }else{
        this.toastr.error('No se ha podido modificar', 'Error');
      }
    });

  }

  changePsw(add: NgForm){
    if (add.value.password === add.value.repPassword) {
      let idOpe = localStorage.getItem('idBT');
      
      this._operator.changePsw(idOpe, add.value.passwordAnt, add.value.password).subscribe(resp => {
        this.closebutton.nativeElement.click();
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contraseñas no coinciden'
      });
    }
  }
}
