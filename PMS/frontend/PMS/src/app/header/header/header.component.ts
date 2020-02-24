import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/user/user.service";
import { IUser } from "src/app/iuser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  id: number;
  user: IUser
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAdmin = false;
    if (sessionStorage.getItem('role') == 'admin') {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    //console.log(this.id)
  }

  getUser(userId: number) {
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
