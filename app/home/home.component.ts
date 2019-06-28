import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private routes:Router, private service : UserService) { }

  ngOnInit() {   
  }
  onLogout() {
    localStorage.removeItem('token');
    this.routes.navigate(['user/login']);
  }
  onList() {
    this.routes.navigate(['list']);
  }

}
