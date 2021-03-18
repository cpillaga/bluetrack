import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public nombreEmpresa: string;
  public nombreSucursal: string;
  public empresa: any;
  public sucursal: any;
  constructor() { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("empresaBT"));
    this.sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    this.nombreSucursal = this.sucursal['name'];
    this.nombreEmpresa = this.empresa['businessName'];
  }

}
