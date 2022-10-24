import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../models/post';
import { ViewPostCommentsComponent } from '../view-post-comments/view-post-comments.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;

  constructor(private dialog: MatDialog) {}

  viewPostComments() {
    this.dialog.open(ViewPostCommentsComponent);
  }

  ngOnInit(): void {}
}
