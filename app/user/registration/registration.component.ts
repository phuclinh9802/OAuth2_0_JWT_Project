import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit() {
    this.service.register().subscribe(
      (res:any) => {
        if (res.succeeded) {
          this.toastr.success('Welcome to our club!', 'Register completed');
           this.service.formModel.reset();
        }
        else {
          res.errors.forEach(element => {
            switch(element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Please try again.', 'Username is already taken.');
              default: 
                this.toastr.error('Please try again.', 'Registration failed.');

            }
          });
          
        }
      },
      err => {
        this.toastr.error('Please try again.', 'Registration failed.');
    });
  }

}
