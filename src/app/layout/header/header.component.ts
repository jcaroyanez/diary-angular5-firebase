import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  listNotifycation = [];

  constructor(private _router:Router, private _authService:AuthService,private _contactService:ContactService) { }

  ngOnInit() {
    this._contactService.getNotifycation();
    this._contactService.eventNotify.subscribe(data => {
      this.listNotifycation = [];
      this.listNotifycation = data;
    });
  }

  
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
 
  public toggled(open: boolean): void {}
 
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  logout(){
    this._authService.logout().then((rest:any) => {
      if(rest.success){
        this._router.navigate(['/login']);
      }
    })
  }

}
