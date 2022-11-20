import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../comunity/models/post";
import {Profile} from "../../../comunity/models/profiles";
import {MatDialog} from "@angular/material/dialog";
import {PostsService} from "../../../comunity/services/posts.service";
import {ViewPostCommentsComponent} from "../../../comunity/components/view-post-comments/view-post-comments.component";

@Component({
  selector: 'app-post-home-card',
  templateUrl: './post-home-card.component.html',
  styleUrls: ['./post-home-card.component.css']
})
export class PostHomeCardComponent implements OnInit {

  @Input() post!: Post;
  profile!:Profile;

  profileId!: number;

  constructor(private dialog: MatDialog, private postsService: PostsService) {

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
