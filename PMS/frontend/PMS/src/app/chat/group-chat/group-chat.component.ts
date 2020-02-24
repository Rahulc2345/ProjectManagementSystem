import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from "src/app/chat/chat.service";
import { UserService } from "src/app/user/user.service";
import { IUser } from "src/app/iuser";

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  username: string;
  messages: any;
  group: any;
  messageText: string;
  projectId: any;
  loggedUserId: any;
  otherUserId: any;
  sender: any
  receivers: any[] = []
  loggedInUser: IUser[] = [];
  otherUsers: IUser[] = [];
  users: IUser[] = [];
  user: string
  room: string = 'group'
  showSender: boolean = false;
  showReceiver: boolean = false;
  notification: Array<{ user: String, message: String }> = [];
  groupMessageArray: Array<{ user: String, message: String }> = [];
  isTyping: boolean = false;
  typer: any

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService, private router: Router) {
    this.projectId = this.route.snapshot.params.projectId;

    this.chatService.newUserJoined()
      .subscribe(data => {
        this.notification.push(data)
      });

    this.chatService.userLeftRoom()
      .subscribe(data => {
        this.notification.push(data)
      });

    this.chatService.newGroupMessageReceived()
      .subscribe(data => this.groupMessageArray.push(data));

    this.chatService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
      this.typer = this.chatService.typingGroupUser
      this.timeout();
    });

  }

  ngOnInit() {
    this.showSender = false;
    this.showReceiver = false;
    this.isTyping = false
    this.getUsers();
    this.loggedUserId = sessionStorage.getItem('userId')
    // console.log(this.loggedUserId)
  }

  timeout() {
    setTimeout(() => {
      this.isTyping = false;
    }, 1500)
  }

  getUsers() {
    this.userService.getUsersByProjectId(this.projectId).subscribe(
      data => {
        this.users = data;
        for (var i = 0; i < this.users.length; i++) {
          if (this.loggedUserId != this.users[i].id) {
            this.otherUsers.push(this.users[i])
          } else {
            this.loggedInUser.push(this.users[i])
          }
        }
        this.join();
      },
      error => {
        console.log(error);
      }
    )
  }

  getReceivers() {
    for (var i = 0; i < this.otherUsers.length; i++) {
      this.receivers.push(this.otherUsers[i]._id)
    }
    this.sender = this.loggedInUser[0]._id
    //console.log(this.sender)
  }

  // checkUser() {
  //   if (this.loggedInUser[0].name === this.user) {
  //     this.sender = true;
  //   }
  //   else {
  //     this.sender = false;
  //   }
  // }

  sendMessage() {
    this.getReceivers()
    // console.log("this.receivers")
    //console.log(this.receivers)
    this.chatService.sendGroupMessage({ user: this.user, from: this.sender, to: this.receivers, message: this.messageText, group: this.projectId });
    //console.log("after send msg")
    this.messageText = ''
  }

  join() {
    //console.log('in join group: joined user name')
    //console.log(this.loggedInUser[0].name)
    this.user = this.loggedInUser[0].name
    this.chatService.joinRoom({ user: this.user, room: this.room });
    this.getOldMessages()
  }



  leave() {
    // console.log('in leave group: left user name')
    // console.log(this.user)
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }


  getOldMessages() {
    this.chatService.getOldGroupMessages(this.projectId).subscribe(
      data => {
        for (var i = 0; i < data.length; i++) {
          this.messages = data[i].message
          this.username = data[i].username
          //console.log(this.username + "...." + this.messages)
          this.groupMessageArray.push({ user: this.username, message: this.messages })
        }
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  typing() {
    //console.log("in typing group")
    this.chatService.typing({ room: this.room, user: this.user });
  }

  userClicked(id) {
    console.log("user clicked")
    this.router.navigate(['member-detail', id])
  }

}
