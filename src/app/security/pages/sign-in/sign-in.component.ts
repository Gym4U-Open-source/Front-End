import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  private userData!: any;
  public loginForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });

    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.userData.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          console.log('Login Success');
          this.loading = false
          this.loginForm.reset();
          let _ = { loggedIn: true, data: user };
          localStorage.setItem('user', JSON.stringify(_));
          window.location.reload();
        } else {
          console.log('User not found !!');
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        console.log('Something went wrong !!');
      },
    });
  }
}
