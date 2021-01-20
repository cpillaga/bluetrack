import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../models/business.model';
import { AutenticacionService } from '../services/autenticacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'BLUETRACK';
  public business: Business;
  public identity;
  public token;

  email: string;

  constructor(
    public _autenticacionService: AutenticacionService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  public login(forma: NgForm){
   
    if(forma.invalid) {
      return;
    }
  
    this._autenticacionService.login(forma.value.email, forma.value.password)
      .subscribe(correcto => {
        localStorage.setItem("empresa", JSON.stringify(correcto.business));
        localStorage.setItem("token", correcto.token);
        localStorage.setItem("id", correcto.id);
        this.router.navigate(['/home']);
      });
  }

}
