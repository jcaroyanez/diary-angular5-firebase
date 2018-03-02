import { Component, OnInit } from '@angular/core';
import { MenuCategoryService } from '../../../services/menu-category.service';
import { DataTableResource } from '../../data-table';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-category-menu-list',
  templateUrl: './category-menu-list.component.html',
  styleUrls: ['./category-menu-list.component.css']
})
export class CategoryMenuListComponent implements OnInit {
  getItem = new BehaviorSubject<any>([]);
  public listMenuCategorys = [];
  public isLoader:boolean;
  public itemCount:number = 0;
  public itemResource;
  public items = [];
  public error:boolean;
  public success:boolean;
  public message:string;
  public limit:number = 0;
  public finishParams:any;


  constructor(private _menuCategoryService:MenuCategoryService) { 
     this.isLoader = true;
     this.error = false;
     this.success = false;
  }

  ngOnInit() {

  }

  public reloadItems(params){
    this.finishParams = params;
    this.isLoader = true;
    this.listMenuCategorys = [];
    this.items = [];

    this.itemResource = null;

    this._menuCategoryService.findAllActive().subscribe((rest:any) =>{
    
      this.listMenuCategorys = rest;
      this.itemCount = this.listMenuCategorys.length;
      if(this.itemCount >= 7){
        this.limit = 7;
      }else{
        this.limit = this.itemCount;
      }
   
      this.itemResource = new DataTableResource(rest);
      this.itemResource.query(params).then(items =>{ 
        this.items = items;
      });
     
     
    },error => {
     this.isLoader = false;
     this.error = true;
     this.message = "Error en la petición"
    },() => {
     this.error = false;
     this.isLoader = false;
    });  
  }

  public deleted(item){
      this.error = false;
      this.success = false;
      this._menuCategoryService.deleteMenuCategory(item.idCategory).subscribe((rest:any) =>{
      this.message = rest.message;
     },error => {
      this.message = "Error en la petición al eliminar una menu categoría";
      this.error = true;
      this.success = false;
     },()=>{
       this.error = false;
       this.success = true;
       this.reloadItems(this.finishParams);
     })
     
  }

  onKey(event:any){
    let q = event.target.value;
    this.items = this.listMenuCategorys.filter((c:any) => {
      if((c.categoryName.toLowerCase().indexOf(q.toLowerCase())) > -1){
        return true;
      }return false;  
    });
  }

}
