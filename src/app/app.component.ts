import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  url:string;

  constructor(private _router:Router, private _authService:AuthService){
      this._router.events.subscribe((rest:any) => { 
      
        this.url = rest.url;
        switch (this.url) {
          case '/login':
            this.checkIsAurthUrlInit(this.url);
            break;
          case '/register':
            break;
          default:
            if(this.url && this.url != "" && this.url != undefined)
            this.checkIsAurthUrl(this.url);
            break;
        }
    }); 
  }

  checkIsAurthUrl(url){
      this._authService.isAuth().then((res:any) => { 
        if(res.success)
        this._router.navigate([url]);
        else 
        this._router.navigate(['/login']);
      });
  }


  checkIsAurthUrlInit(url){
    console.log('checkIsAurthUrlInit');
    this._authService.isAuth().then((res:any) => { 
      if(res.success)
      this._router.navigate(['dashboard']);
    });return;
  }

}
