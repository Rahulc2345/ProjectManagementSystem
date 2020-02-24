import { Component, OnInit } from '@angular/core';
import { IUser } from "src/app/iuser";
import { UserService } from "src/app/user/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: IUser;
  userId: any;
 // uId: number = 0;
  enableEdit: any;
  constructor(private userService: UserService, private route: ActivatedRoute) {
    //this.uId = this.route.snapshot.params.uId
  }

  ngOnInit() {
    this.enableEdit = {};
    this.userId = sessionStorage.getItem('userId')
    this.getUser();
    
    
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.user = data;
        //console.log(this.user);
      },
      error => {
        console.log(error)
      }
    );
  }

  

  onClickEdit(user: IUser) {
    this.enableEdit = user;
  }

  onClickCancel() {
    this.enableEdit = {};
  }

  onClickUpdate(u: IUser) {
    this.userService.updateUser(u).subscribe(
      data => {
        this.enableEdit = {};
       // console.log(this.user);
      },
      error => {
        console.log(error)
      }
    );
  }

}
