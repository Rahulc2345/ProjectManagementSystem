import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  typingGroupUser: any
  constructor(private http: HttpClient) { }

  private socket = io('http://localhost:3000');

  joinRoom(data) {
    // console.log("chat service")

    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new user joined', (data) => {
        //console.log("new user joined observable")
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  sendPrivateMessage(data) {
    this.socket.emit('message', data);
  }

  sendGroupMessage(data) {
    this.socket.emit('group message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  newGroupMessageReceived() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new group message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  // sendIds(data){
  //   this.socket.emit('ids', data);
  // }

  // oldMessages() {
  //   let observable = new Observable<{ user: String, message: String }>(observer => {
  //     this.socket.on('old message', (data) => {
  //       observer.next(data);
  //     })
  //     return () => { this.socket.disconnect() }
  //   })
  //   return observable;
  // }

  getOldPrivateMessages(fromUser: number, toUser: number[]) {
    return this.http.get('http://localhost:3000/routes/chats/' + fromUser + '/' + toUser)
  }

  getOldGroupMessages(projectId) {
    return this.http.get('http://localhost:3000/routes/chats/' + projectId)
  }

  typing(data) {
    //console.log("in typing service")
    this.socket.emit('typing', data);
  }

  stoppedTyping(data) {
    this.socket.emit('not typing', data)
  }

  receivedTyping() {
    //console.log("in received typing service")
    const observable = new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on('istyping', (data) => {
        //console.log("in received typing service data")
        //console.log(data)
        this.typingGroupUser = data.username
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // stoppedTypingEvent() {
  //   console.log("in stopped typing service")
  //   const observable = new Observable<{ isTyping: boolean }>(observer => {
  //     this.socket.on('stoppedtyping', (data) => {
  //        console.log("in stopped typing service")
  //       console.log(data)
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }


}
