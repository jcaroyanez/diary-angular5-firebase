import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contacts-add',
  templateUrl: './contacts-add.component.html',
  styleUrls: ['./contacts-add.component.css']
})
export class ContactsAddComponent implements OnInit {
  
  formContact:FormGroup;
  success:boolean;
  error:boolean;
  message:string;
  isLoader:boolean;

  errorsForm = {
    'name':'',
    'email':'',
    'cel':''
  };

  messageValidator = {
    'name':{
      'required':'ingrese un nombre es obligatorio'
    },'email':{
      'required':'Ingrese un email es requerido',
      'email':'Ingrese un email valido'
    },'cel':{
      'required':'Ingrese un celular es requerido'
    }
  }

  constructor(private _formBuilder:FormBuilder,private _contactService:ContactService) {

    this.error = false;
    this.success = false;
    this.isLoader = false;

    this.formContact = this._formBuilder.group({
      'name':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'cel':['',Validators.required]
    });

    this.formContact.valueChanges.subscribe(rest => this.onValueChanged(rest));
    this.onValueChanged();

   }

  ngOnInit() {
  }

  onSubmit(){
    this.isLoader = true;
    this.error = false;
    this.success = false;
    const contact = {
      'name':this.formContact.get('name').value,
      'email':this.formContact.get('email').value,
      'cel':this.formContact.get('cel').value
    };
    this._contactService.add(contact).then((rest:any) => {
      if(rest.success){
          this.isLoader = false;
          this.success = true;
          this.formContact.reset();
          this.message = "Contacto agregado con exito";
      }else{
        this.isLoader = false;
         this.error = true;
         this.message = "a ocurrido un error intentelo mas tarde";
      }
    });
  }

  onValueChanged(data?: any) {
    if (!this.formContact) { return; }
    const form = this.formContact;
    for (const field in this.errorsForm) {
      this.errorsForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.messageValidator[field];
        for (const key in control.errors) {
          if( this.errorsForm[field] === "")
          this.errorsForm[field] += messages[key];
          else
          this.errorsForm[field] += ', '+messages[key] + '  ';
         }
       }
     }
   }

}
