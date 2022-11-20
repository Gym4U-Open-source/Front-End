import {Component, OnInit, inject, ViewChild, Inject, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from "@angular/forms";
import {Post} from "../../models/post";
import {MatTableDataSource} from "@angular/material/table";
import {PostsService} from "../../services/posts.service";
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {CustomerProfile} from "../../../profiles/model/customer-profile";
import {ProfileService} from "../../../security/services/profile.service";
import {Profile} from "../../models/profiles";
@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {
  postData!: Post;
  postForm!: FormGroup;
  post!:Post;
  profile!:Profile;
  dataSource!: MatTableDataSource<any>;

  profileId!: number;

  constructor(
    private formBuilder: FormBuilder,
              private postsService: PostsService,
              private matDialogRef: MatDialogRef<AddPostDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData:any
  ) {
  //  this.profileId = this.editData.profileId;
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      profileId:[0,Validators.required],
      title:['',Validators.required],
      description: ['',Validators.required],
      urlImage: ['',Validators.required],
    })

  }

  add() {
    //console.log(this.editData.profileId + 'holaaaaaaaaaaaaaaaa');
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
