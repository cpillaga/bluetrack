import { Component, OnInit, ViewChild } from '@angular/core';
import { Rutas } from '../../models/rutas.model';
import { Province } from '../../models/province.model';
import { Canton } from '../../models/canton.model';
import { NgForm } from '@angular/forms';
import { GeneralService } from '../../services/general.service';

import Swal from 'sweetalert2';
import { RutasService } from '../../services/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {

  ruta: Rutas;
  rutas: Rutas[] = [];
  provincias: Province[] = [];
  cantones: Canton[] = [];

  provincia: string;
  pidProv: string;

  canton: string;
  pidCant: string;

  public estadoBtnAdd = false;
  public updData = false;

  @ViewChild('closebutton',  {static: false}) closebutton;
  @ViewChild('closebuttonUpd',  {static: false}) closebuttonUpd;


  constructor(
    public _provCant: GeneralService,
    public _ruta: RutasService
  ) { }

  ngOnInit(): void {
    this.getProvincia();
    this.getRuta();
  }

  getRuta(){
    const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    const idSucursal = sucursal['_id'];
    
    this._ruta.getRutas(idSucursal).subscribe(resp => {
      this.rutas = resp;
    });
  }

  addRuta(rutaForm: NgForm){
    this.estadoBtnAdd = true;

    const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    const cantonOrigenA = sucursal['canton']['_id'];
    const idSucursal = sucursal['_id'];

    this.ruta = {
      cantonOrigen: cantonOrigenA,
      cantonDestino: rutaForm.value.cantonDest,
      branchOffice: idSucursal,
      status: "Activo"
    }

    this._ruta.addRutas(this.ruta).subscribe(resp => {
      this.getRuta();
      this.closebutton.nativeElement.click();
      this.estadoBtnAdd = false;
  
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

  public questionYN(idRuta, desc, status){
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
      text: "Seguro desea " + texto + " la ruta a " + desc + "?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#2E57A6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
       
        this._ruta.delRuta(idRuta, estado).subscribe(resp => {
          this.getRuta();
        });
      }
    });
  }
}
