import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formRegister:FormGroup;
  error:boolean;
  success:boolean;
  message:string;
  isLoading:boolean;

  errorsForm = {
    'name':'',
    'email':'',
    'password':''
  };

  messageValidator = {
    'name':{
      'required':'ingrese un nombre es obligatorio'
    },
    'email':{
      'required':'ingrese un email es obligatorio',
      'email':'ingrese un email valido'
    },
    'password':{
      'required':'ingrese una contraseña es obligatorio',
      'minlength':'digite una contraseña minimo de 6 caracteres'
    }
  }

  constructor(public formBuilder:FormBuilder, public _usersService:UsersService){
    this.isLoading = false;
    this.formRegister = this.formBuilder.group({
      'name':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'password':['',[Validators.required,Validators.minLength(6)]]
    });

    this.success = false;
    this.error = false;

    this.formRegister.valueChanges.subscribe(rest => this.onValueChanged(rest));
    this.onValueChanged();
  }

  ngOnInit(){
  }

  onSubmit(){
    this.isLoading = true; 
    this.success = false;
    this.error = false;

    const user = {
      name:this.formRegister.get('name').value,
      email:this.formRegister.get('email').value,
      password:this.formRegister.get('password').value
    };

    this._usersService.addUsers(user).then((rest:any) => {
      this.isLoading = false;
      this.success = true;
      this.message = rest.message;
      this.formRegister.reset();
    }).catch((error:any) => {
      this.isLoading = false;
      this.error = true;
      this.message = error.message;
    });

  }

  onValueChanged(data?: any) {
    if (!this.formRegister) { return; }
    const form = this.formRegister;
    for (const field in this.errorsForm) {
      this.errorsForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.messageValidator[field];
        for (const key in control.errors) {
          if( this.errorsForm[field] === "")
          this.errorsForm[field] += messages[key] + '  ';
          else
          this.errorsForm[field] += ', '+messages[key] + '  ';
         }
       }
     }
   }

}
