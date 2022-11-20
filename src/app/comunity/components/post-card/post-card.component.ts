import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../models/post';
import { ViewPostCommentsComponent } from '../view-post-comments/view-post-comments.component';
import {Profile} from "../../models/profiles";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  profile!:Profile;

  profileId!: number;

  constructor(private dialog: MatDialog, private postsService: PostsService) {

  }

  viewPostComments() {
    this.dialog.open(ViewPostCommentsComponent);
  }

  getProfileName(){
    this.profileId = this.post.profileId;
    this.postsService.getProfileById(this.profileId).subscribe((response: any) => {
      this.profile = response;
    });

  }


  ngOnInit(): void {
    this.getProfileName();
  }
}

