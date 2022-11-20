import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FallowerService } from '../../services/fallower.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  userData!: any;
  followers!: any;
  currentUserCommunication!: any;
  messages: any;

  constructor(
    private chatService: ChatService,
    private followersService: FallowerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');

    if (this.userData === '') {
      this.router.navigate(['/signin']);
    }

    if (this.userData.data.user.roles[0] === 'COACH') {
      this.getUserFollowers();
    } else {
      this.getUserFollow();
    }
  }

  async getUserFollowers() {
    await this.followersService
      .getUserFollowers(this.userData.data.user.id)
      .toPromise()
      .then((res) => {
        this.followers = res.content;
        this.currentUserCommunication = this.followers[0].normalUser;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getMessages();
  }

  async getUserFollow() {
    await this.followersService
      .getUserFollow(this.userData.data.user.id)
      .toPromise()
      .then((res) => {
        this.followers = res;
        console.log('FOLLOW TO USER: ', res.coachUser);
        this.currentUserCommunication = res.coachUser;
      })
      .catch((err) => {
        console.log(err);
      });

    this.getMessages();
  }

  onChangeCurrentUserCommunication(follower: any) {
    console.log(follower);
    this.currentUserCommunication = follower;
    this.getMessages();
  }

  async setMessage(message: any) {
    let fromUserId = this.userData.data.user.id;
    let toUserId = this.currentUserCommunication.id;
    let success = false;
    console.log('From: ', fromUserId);
    console.log('To: ', toUserId);
    console.log('Message: ', message);

    await this.chatService
      .setMessage(toUserId, fromUserId, message)
      .toPromise()
      .then((res) => {
        console.log(res);
        success = true;
        this.getMessages();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(success);
  }

  async getMessages() {
    this.messages = [];
    await this.chatService
      .getMessages()
      .toPromise()
      .then((res) => {
        res.content.forEach((element: any) => {
          if (this.userData.data.user.roles[0] === 'COACH') {
            if (
              element.toUserId === this.currentUserCommunication.id ||
              element.fromUserId === this.currentUserCommunication.id
            ) {
              this.messages.push(element);
            }
          } else {
            if (
              element.toUserId === this.userData.data.user.id ||
              element.fromUserId === this.userData.data.user.id
            ) {
              this.messages.push(element);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.currentUserCommunication);
    console.log(this.messages);
  }

  generateRandomString(num: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
