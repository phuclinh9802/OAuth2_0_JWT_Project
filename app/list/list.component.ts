import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  userDetails;

  constructor(private router : Router, private service : UserService) { }

  ngOnInit() {
    
    this.service.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
      );
  }

}

