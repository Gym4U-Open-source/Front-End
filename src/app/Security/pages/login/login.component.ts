import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private userData!: any;
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
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
    this.http.get<any>('https://6334e767ea0de5318a0a56dd.mockapi.io/api/v1/signupUser').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          console.log('Login Success');
          this.loginForm.reset();
          let _tmp = { loggedIn: true, data: user };
          localStorage.setItem('user', JSON.stringify(_tmp));
          window.location.reload();
        } else {
          console.log('User not found !!');
        }
      },
      (err) => {
        console.log('Something went wrong !!');
      }
    );
  }
}