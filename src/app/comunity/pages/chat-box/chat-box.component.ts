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
  userCommunication!: any;

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
    }

    //console.log(this.userData);
    //console.log('USER FOLLOWERS: ', this.followers);
  }

  async getUserFollowers() {
    await this.followersService
      .getUserFollowers(this.userData.data.user.id)
      .toPromise()
      .then((res) => {
        this.followers = res.content;
        this.userCommunication = this.followers[0].normalUser;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('USER FOLLOWERS: ', this.followers);
    console.log('USER COMMUNICATION: ', this.userCommunication);
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
