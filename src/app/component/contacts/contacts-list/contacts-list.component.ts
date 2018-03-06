import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { DataTableResource } from '../../data-table';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {


  listContacts = [];
  listContactsAux = [];
  finishParams: any;
  public items = [];
  public limit: number = 0;
  public itemCount: number = 0;
  public itemResource;

  constructor(private _contactService: ContactService) {
      this._contactService.getAllContacts();
   }
  
  ngOnInit(){
    this._contactService.evenContacts.subscribe(data => {
      this.listContacts = [];
      this.listContacts = data;
      this.listContactsAux = this.listContacts;
      this.reloadItems({offset: 0, limit: this.limit});
    });
  }

  ngOnDestroy() {
  }

  reloadItems(params) {
      this.finishParams = params;
      this.items = [];
      this.listContactsAux = [];
      this.itemResource = null;
      this.listContactsAux = this.listContacts;
      

      this.itemCount = this.listContactsAux.length;
      if (this.itemCount >= 7) {
        this.limit = 7;
      } else {
        this.limit = this.itemCount;
      }
      this.itemResource = new DataTableResource(this.listContactsAux);
      this.itemResource.query(params).then(items => {
        this.items = items;
      });
  }

  onKey(event:any){
    let q = event.target.value;
    this.items = this.listContactsAux.filter((c:any) => {
      if((c.name.toLowerCase().indexOf(q.toLowerCase())) > -1){
        return true;
      }return false;  
    });
  }

}
