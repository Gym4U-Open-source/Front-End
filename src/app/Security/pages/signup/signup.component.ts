import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  userCoachSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      userType: [''],
      coachFocus: [''],
      email: [''],
      password: [''],
    });
  }

  signUp() {
    this.http
      .post<any>('https://6334e767ea0de5318a0a56dd.mockapi.io/api/v1/signupUser', this.signUpForm.value)
      .subscribe(
        (res) => {
          console.log('Sign Up successful !!');
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          console.log('Something went wrong !!');
        }
      );
  }

  selectUserType() {
    if (this.signUpForm.value.userType === 'coachUser')
      this.userCoachSelected = true;
    else this.userCoachSelected = false;
  }
}
