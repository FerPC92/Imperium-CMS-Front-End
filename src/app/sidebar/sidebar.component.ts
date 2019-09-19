import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {MainService} from '../services/main.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userName;
  userEmail;
  profileImg;

  constructor(public _router :Router, public _mainService : MainService) {
    this.userName = localStorage.getItem("name");
    this.userEmail= localStorage.getItem("userEmail");
    this.profileImg= localStorage.getItem("profile_image");
   }

   logout(){
     localStorage.clear()
     this._router.navigateByUrl('/login')
   }

  ngOnInit() {
  }

}
