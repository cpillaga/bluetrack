import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../models/business.model';
import { AutenticacionService } from '../services/autenticacion.service';
import { NgForm } from '@angular/forms';
import { GeneralService } from '../services/general.service';

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
    public _generalService: GeneralService,
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

        this._generalService.getSucursal(correcto.user.branchOffice).subscribe(resp => {
          if(resp[0].status == "true" && resp[0].business.status == "true" ){

            localStorage.setItem("sucursalBT", JSON.stringify(resp[0]));
            localStorage.setItem("empresaBT", JSON.stringify(resp[0].business));
            localStorage.setItem("tokenBT", correcto.token);
            localStorage.setItem("idBT", correcto.user._id);
            this.router.navigate(['/home']);
          }else{
            this.router.navigate(['/login']);
          }
        });
      });
  }

}
