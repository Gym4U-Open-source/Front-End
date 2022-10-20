import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  userCoachSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: UserService
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
    this.api.postUser(this.signUpForm.value).subscribe({
      next: (res) => {
        console.log('Sign Up successful !!');
        this.signUpForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log('Something went wrong !!');
      },
    });
  }

  selectUserType() {
    if (this.signUpForm.value.userType === 'coachUser')
      this.userCoachSelected = true;
    else this.userCoachSelected = false;
  }
}
