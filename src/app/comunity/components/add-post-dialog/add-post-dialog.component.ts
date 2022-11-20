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

  postForm!: FormGroup;
  @Input() post!:Post;
  profile!:Profile;
  auxProfile!:any;

  //profileId!: number;

  constructor(
    private formBuilder: FormBuilder,
              private postsService: PostsService,
              private matDialogRef: MatDialogRef<AddPostDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData:any
  ) {

  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title:['',Validators.required],
      description: ['',Validators.required],
      urlImage: ['',Validators.required],
    })
   // this.profile = localStorage.getItem("user");
    this.auxProfile=JSON.parse(localStorage.getItem("user")|| '{}');
    this.profile = this.auxProfile.data.profile;
  }

  add() {

    console.log(this.auxProfile)
    console.log( this.profile)
    //console.log(this.editData.profileId + 'holaaaaaaaaaaaaaaaa');
    //this.profileId = this.post.profileId;
    if (this.postForm.valid) {
      this.postsService.addPost(this.profile.id,this.postForm.value)
        .subscribe({
          next: (res) => {
            console.log("Post created successfully")
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
