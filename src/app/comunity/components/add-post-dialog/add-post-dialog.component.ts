import {Component, OnInit, inject, ViewChild, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from "@angular/forms";
import {Post} from "../../models/post";
import {MatTableDataSource} from "@angular/material/table";
import {PostsService} from "../../services/posts.service";
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {
  postData!: Post;
  postForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private matDialogRef: MatDialogRef<AddPostDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      image_post: ['', Validators.required],
      post_description: ['', Validators.required]
    })
  }

  add() {
    if (this.postForm.valid) {
      this.postsService.addPost(this.postForm.value)
        .subscribe({
          next: (res) => {
            console.log("note created successfully")
            this.postForm.reset();
            this.matDialogRef.close('save');
          },
          error: () => {
            alert("Error while adding the product")
          }
        })
    }
  }
}
