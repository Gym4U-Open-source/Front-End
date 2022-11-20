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

  constructor(
    private chatService: ChatService,
    private followersService: FallowerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');

    if (this.userData === '') {
      this.router.navigate(['/signin'])
    }
  }
}
