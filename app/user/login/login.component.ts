import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password:''
  }
  constructor(private service:UserService, private router:Router, private toastr:ToastrService) { }
  

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['home'], {replaceUrl: true});
    }  
  }
  onSubmit(form:NgForm) {
    this.service.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token',res.token);
        this.toastr.success('Yay!!! You have been logged in!!', 'Login successful, enjoy :) ');
        this.router.navigateByUrl('home');
      },
      err => {
        if (err.status == 400) {
          //console.log('Incorrect Username/Password');
          this.toastr.error('Incorrect Username/Password', 'Login has been failed!');
        }
        else {
          this.toastr.error('Please try again!', 'Error.');
        }
      }

    
    );
    
  }

}
