import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { URL } from './util';

@Injectable()
export class MenuCategoryService {

  constructor(private _httpClient:HttpClient) { }

  public save(name:string){

    const params = new URLSearchParams();
    params.set('name',name);

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    
   return this._httpClient.post(URL+"/menuCategory",
    params.toString(),{headers: headers})
  }

  public findAllActive(){
    return this._httpClient.get(URL+"/menuCategory");
  }

  public deleteMenuCategory(id){
    return this._httpClient.delete(URL+"/menuCategory/"+id);
  }

}
