import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {

  }

  public cerrarSesion(){    
    localStorage.removeItem("empresa");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.router.navigate(['/login']);
  }
}
