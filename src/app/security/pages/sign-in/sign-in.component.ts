import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  private userData!: any;
  public loading: boolean = false;
  public userForm = new FormGroup<User>({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(private router: Router, private api: UserService) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.userData.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.loading = true;

    if (this.userForm.valid) {
      this.api.getUsers(this.userForm.value).subscribe({
        next: (res) => {
          console.log(res.resource)
          localStorage.setItem('user', JSON.stringify({ loggedIn: true, data: res.resource }))
          window.location.reload()
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
        },
      });
    }
    this.loading = false;
  }
}
