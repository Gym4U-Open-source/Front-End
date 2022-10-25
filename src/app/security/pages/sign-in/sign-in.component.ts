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
      this.api.getUsers().subscribe({
        next: (res) => {
          const user = res.find((element: User) => {
            return (
              element.username === this.userForm.get('username')?.value &&
              element.password === this.userForm.get('password')?.value
            );
          });
          if (user) {
            console.log('Login Success');
            localStorage.setItem(
              'user',
              JSON.stringify({ loggedIn: true, data: user })
            );
            window.location.reload();
          } else {
            console.log('User not found !!');
            this.loading = false;
          }
        },
        error: () => {
          this.loading = false;
          console.log('Something went wrong !!');
        },
      });
    }
    this.loading = false;
  }
}
