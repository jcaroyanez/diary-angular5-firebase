import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MenuCategoryService } from '../../../services/menu-category.service';
import { error } from 'util';

@Component({
  selector: 'app-category-menu-add',
  templateUrl: './category-menu-add.component.html',
  styleUrls: ['./category-menu-add.component.css']
})
export class CategoryMenuAddComponent implements OnInit {

  formCategory:FormGroup;
  name:string;
  success:boolean;
  error:boolean;
  message:string;
  isLoader:boolean;

  errorsForm = {
    'name':''
  };

  messageValidator = {
    'name':{
      'required':'ingrese un nombre para la categoría es obligatorio'
    }
  }

  constructor(private _formBuilder:FormBuilder,private _menuCategoryService:MenuCategoryService) {
    this.name = null;
    this.error = false;
    this.success = false;
    this.isLoader = false;

    this.formCategory = this._formBuilder.group({
      'name':new FormControl('',Validators.required)
    });

    this.formCategory.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

   }

  ngOnInit() {
  }

  onSubmit(){
    this.error = false;
    this.success = false;
    this.isLoader = true;

    this.name = this.formCategory.get('name').value;
    this._menuCategoryService.save(this.name).subscribe((rest:any) => {
      if(rest.tipo == 200){
        this.success = true;
        this.message = rest.message;
        this.formCategory.reset();
      }else if(rest.tipo == 400){
        this.error = true;
        this.message = rest.message;
      }
    },(error:any) => {
      this.error = true;
      this.isLoader = false;
      this.message = "Error en la peticion";
    },() => {
      this.isLoader = false;
    });
  }

  onValueChanged(data?: any) {
    if (!this.formCategory) { return; }
    const form = this.formCategory;
    for (const field in this.errorsForm) {
      this.errorsForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.messageValidator[field];
        for (const key in control.errors) {
          this.errorsForm[field] += messages[key] + ' ';
         }
       }
     }
   }

}
