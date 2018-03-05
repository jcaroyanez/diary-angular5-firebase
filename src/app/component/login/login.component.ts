import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {'class': 'login-page'}
})
export class LoginComponent implements OnInit,OnChanges {

  formLogin:FormGroup;
  error:boolean;
  message:string;
  isLoading:boolean;
  returnUrl: string;
  
  errorsForm = {
    'email':'',
    'password':''
  };

  messageValidator = {
    'email':{
      'required':'ingrese un email es obligatorio',
      'email':'ingrese un email valido'
    },
    'password':{
      'required':'ingrese una contraseña es obligatorio',
      'minlength':'digite una contraseña minimo de 6 caracteres'
    }
  }

  constructor(private _formBuilder:FormBuilder, private _router:Router, private _authService:AuthService, private _route:ActivatedRoute){
    this._authService.isAuth().then((rest:any) => {
      if(rest.success){
        this._router.navigate(['/dashboard']);
      }
    });

    this.error = false;
    this.isLoading = false;

    this.formLogin = this._formBuilder.group({
      'email':['',[Validators.required,Validators.email]],
      'password':['',[Validators.required,Validators.minLength(6)]]
    });

    this.formLogin.valueChanges.subscribe(rest => this.onValueChanged(rest));
    this.onValueChanged();

  }

  ngOnChanges(){

  }


  ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/dashboard';
    console.log(this.returnUrl);
  }

  onSubmit(){
   this.error = false;
   this.isLoading = true;
   const user = {
     email:this.formLogin.get('email').value,
     password:this.formLogin.get('password').value
   };
   this._authService.logIn(user).then((rest:any) => {
     if(rest.success){
      this._router.navigate([this.returnUrl]);
     }else{
       this.isLoading = false;
       this.error = true;
       this.message = rest.message;
     }
   }).catch((error:any) => {
      this.isLoading = false;
      this.error = true;
      this.message = error.message;
   })
  }

  onValueChanged(data?: any) {
    if (!this.formLogin) { return; }
    const form = this.formLogin;
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
