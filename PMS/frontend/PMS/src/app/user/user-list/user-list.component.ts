import { Component, OnInit } from '@angular/core';
import { IUser } from "src/app/iuser";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }
  isAdmin: boolean = false;
  enableEdit: any = {}
  users: IUser[] = [];

  ngOnInit() {
    if (sessionStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
      this.getUsers()
    }
    else {
      this.isAdmin = false;
    }
  }

  getUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  // getUser(userId: number) {
  //   this.userService.getUserById(userId).subscribe(
  //     data => {
  //       this.users = data;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  onClickEdit(user: IUser) {
    this.enableEdit = user;
  }

  onClickDelete(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      data => {
        //console.log(data);
        this.getUsers();
      },
      error => {
        console.log(error);
      }
    );
  }


  onClickUpdate(user: IUser) {
    this.enableEdit = {};
    this.userService.updateUser(user).subscribe(
      data => {
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickCancel() {
    this.enableEdit = {};
  }

}
