import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../model/post";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postArray:Post[];
  postData: Post;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private postsService: PostsService) {
    this.postArray = {} as Post[];
    this.dataSource = new MatTableDataSource<any>();
    this.postData = {} as Post;
  }

  getAllHotels() {
    this.postsService.getAll().subscribe((response: any) => {
      this.postArray = response;
      this.dataSource=response;
    })
  }


  ngOnInit(): void {
    this.getAllHotels();
  }

}
