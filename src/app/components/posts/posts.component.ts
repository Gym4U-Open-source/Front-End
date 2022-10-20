import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Post} from "../model/post";
import {MatDialog} from '@angular/material/dialog';

import {PostsService} from "../../services/posts.service";
import {AddPostDialogComponent} from "../add-post-dialog/add-post-dialog.component";
import {ViewPostCommentsComponent} from "../view-post-comments/view-post-comments.component";
//import * as _ from "lodash";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() postArray:Array<Post> = [];
  @Input() commentArray:Array<Comment> = [];

  postData!: Post;

  constructor(private postsService: PostsService,
              private dialog:MatDialog) {}

  getAllPost() {
    this.postsService.getAll().subscribe((response: any) => {
      this.postArray = response;

    })
  }

  getAllComments(){
    this.postsService.getAllComments().subscribe((response:any)=>{
      this.commentArray =response;
    })
  }

  addPostDialog() {
    this.dialog.open(AddPostDialogComponent, {
    }).afterClosed().subscribe(value => {
      if(value === 'save'){
        this.getAllPost();
      }
    })
  }
  viewPostComments() {
    this.dialog.open(ViewPostCommentsComponent, {
    }).afterClosed().subscribe(value => {

    })
  }

  ngOnInit(): void {
    this.getAllPost();
  }

}
