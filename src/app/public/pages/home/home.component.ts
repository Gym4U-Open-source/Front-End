import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../comunity/models/post";
import {PostsService} from "../../../comunity/services/posts.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPostDialogComponent} from "../../../comunity/components/add-post-dialog/add-post-dialog.component";
import {ViewPostCommentsComponent} from "../../../comunity/components/view-post-comments/view-post-comments.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() postArray: Array<Post> = [];
  @Input() commentArray: Array<Comment> = [];

  postData!: Post;

  constructor(private postsService: PostsService, private dialog: MatDialog) {}

  getAllPost() {
    this.postsService.getAll().subscribe((response: any) => {
      this.postArray = response;
    });
  }

  ngOnInit(): void {
    this.getAllPost();
  }

}
