import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../models/business.model';
import { OperatorService } from '../services/operator.service';
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
    public _operatorService: OperatorService,
    public _generalService: GeneralService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  public login(forma: NgForm){

    if(forma.invalid) {
      return;
    }

    this._operatorService.login(forma.value.email, forma.value.password)
      .subscribe(correcto => {
        localStorage.setItem("tokenBT", correcto.token);
        this._generalService.getSucursal(correcto.operator.branchOffice).subscribe(resp => {
          if(resp[0].status == "true" && resp[0].business.status == "true" ){
            localStorage.setItem("sucursalBT", JSON.stringify(resp[0]));
            localStorage.setItem("empresaBT", JSON.stringify(resp[0].business));
            localStorage.setItem("idBT", correcto.operator._id);
            this.router.navigate(['/home']);
          }else{
            localStorage.removeItem('tokenBT');
            this.router.navigate(['/login']);
          }
        }, (err) => {
          console.log(err);
        });
      });
  }

}
