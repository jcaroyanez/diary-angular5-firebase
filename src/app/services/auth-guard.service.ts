import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private _angularFireAuth:AngularFireAuth,private _router:Router,private  _authService:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       
       if(this._authService.stateUsers){
        return true;
       }
       
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }

}
