import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from "src/app/chat/chat.service";
import { UserService } from "src/app/user/user.service";
import { IUser } from "src/app/iuser";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  typingUser: any;
  loggedUserName: any;
  isTyping: boolean = false;
  messages: String;
  loggedUserId: any;
  selectedUserId: any
  user: String
  loggedInUser: any;
  selectedUser: any
  username: String;
  room: String = 'private';
  messageText: String;
  group = false;
  uniqueId: any
  messageArray: Array<{ user: String, message: String }> = [];
  notification: Array<{ user: String, message: String }> = [];
  notify: String
  //newData:Array<{ user: String, message: String }> = [];
  @Input() userId: any
  @Output() cancelChat: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
    this.loggedUserId = sessionStorage.getItem('userId');
    this.isTyping = false
    this.getLoggedInUser();
    this.getSelectedUser()

  }

  constructor(private chatService: ChatService, private userService: UserService, private route: ActivatedRoute) {
    this.selectedUserId = this.route.snapshot.params.id;

    this.chatService.newUserJoined()
      .subscribe(data => {
        this.notification.push(data)
        // console.log("notify")
        // console.log(this.notification[0].user + "......" + this.notification[0].message)
        // console.log(this.notification.length)
        if (this.notification.length !== 0) {
          this.notify = this.selectedUser[0].name + ' is online'
        } else {
          this.notify = this.selectedUser[0].name + ' is offline'
        }
      });

    // this.chatService.oldMessages()
    //   .subscribe(data => {
    //     console.log(data.user)
    //     // this.messageArray.push(data)
    //     // console.log(this.messageArray)
    //     for (var i = 0; i < data.obj.length - 1; i++) {
    //       this.messages = JSON.stringify(data.obj[i].message);
    //       this.username = JSON.stringify(data.obj[i].name)
    //       this.newData = [{user:this.username, message:this.messages}]
    //       this.messageArray.push(this.newData)
    //     }
    //       console.log(this.messageArray)
    //   });

    this.chatService.userLeftRoom()
      .subscribe(data => {
        this.isTyping = false;
        this.notification.push(data)
      });

    this.chatService.newMessageReceived()
      .subscribe(data => {
        this.messageArray.push(data)
        this.isTyping = false;
      });

    this.chatService.receivedTyping().subscribe(bool => {
      // console.log("in received typing")
      // console.log(bool.isTyping)
      this.isTyping = bool.isTyping;
      this.timeout();
    });

    // this.chatService.stoppedTypingEvent().subscribe(bool => {
    //   console.log("in received typing")
    //   console.log(bool.isTyping)
    //   this.isTyping = bool.isTyping;
    // });

  }

  timeout() {
    setTimeout(() => {
      this.isTyping = false;
    }, 1500)
  }

  join() {
    //console.log(this.user)
    this.chatService.joinRoom({ user: this.user, room: this.room });
    // this.sendIds()
    this.getMessagesByUsers();
  }

  // sendIds() {
  //   this.chatService.sendIds({ user: this.user, from: this.loggedUserId, to: this.selectedUserId })
  // }

  leave() {
    this.cancelChat.emit()
    // this.isOnline = false;
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this.uniqueId = this.loggedUserId + this.selectedUserId
    //console.log(this.uniqueId)
    this.isTyping = false;
    this.chatService.sendPrivateMessage({ user: this.user, from: this.loggedInUser[0]._id, to: this.selectedUser[0]._id, message: this.messageText, group: this.uniqueId });
    this.messageText = ''
  }

  getLoggedInUser() {
    this.userService.getUserById(this.loggedUserId).subscribe(
      data => {
        this.loggedInUser = data;
        // console.log("logged user ")
        // console.log(this.loggedInUser)
        this.loggedUserId = this.loggedInUser[0]._id
        this.user = this.loggedInUser[0].name
        this.join()
      },
      error => {
        console.log(error);
      }
    )
  }

  getSelectedUser() {
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.selectedUser = data;
        //console.log("selected user ")
        //console.log(this.selectedUser)
        this.selectedUserId = this.selectedUser[0]._id
        // this.notify= this.selectedUser[0].name + ' is offline'
        this.typingUser = this.selectedUser[0].name

        this.join()
      },
      error => {
        console.log(error);
      }
    )
  }


  getMessagesByUsers() {
    this.chatService.getOldPrivateMessages(this.loggedUserId, this.selectedUserId).subscribe(
      data => {
        // console.log(this.messages)
        // console.log(999)
        for (var i = 0; i < data.length; i++) {
          this.messages = data[i].message
          this.username = data[i].username
          //console.log(this.username + "...." + this.messages)
          this.messageArray.push({ user: this.username, message: this.messages })
        }
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  typing() {
    console.log("in typing")
    this.chatService.typing({ room: this.room, user: this.user });
   // this.isTyping = false;
  }

}
