import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
    readonly baseURI = 'https://localhost:5001/api';
    formModel = this.fb.group({
      UserName : ['', Validators.required],
      FullName : [''],
      Email : ['', Validators.email],
      Role : ['', Validators.required],
      Passwords: this.fb.group({
        Password : ['', [Validators.required,Validators.minLength(4)]],
        ConfirmPassword : ['', Validators.required]
      }, {validators : this.comparePasswords}),
      
      
    });
    comparePasswords(fb:FormGroup) {
      let confirm = fb.get('ConfirmPassword');
      //password mismatch
      if (confirm.errors == null || 'passwordMismatch' in confirm.errors) {
        if (fb.get('Password').value !== confirm.value) {
          confirm.setErrors({passwordMismatch:true})
        }
        else {
          confirm.setErrors(null);
        }
      }
    }
    register() {
      var body = {
        UserName : this.formModel.value.UserName,
        FullName : this.formModel.value.FullName,
        Email : this.formModel.value.Email,
        Password : this.formModel.value.Passwords.Password,
        Role : this.formModel.value.Role
      };
      return this.http.post(this.baseURI + '/ApplicationUser/Register',body);

    } 
    login(formData) {
      return this.http.post(this.baseURI + '/ApplicationUser/Login', formData);
    }
    getUserProfile() {
      var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('token')});
      return this.http.get(this.baseURI + '/Profile', {headers:tokenHeader});
    }
}
