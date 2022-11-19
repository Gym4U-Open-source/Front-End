import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Focus } from '../../models/focus.model';
import { Person } from '../../models/person.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string = '';
  public signUpForm!: FormGroup;
  role: boolean = false;
  userForm = new FormGroup<User>({
    person: new FormGroup({
      name: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      id: new FormControl(),
    }),
    role: new FormControl(Role.NORMAL, { nonNullable: true }),
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  signUp() {
    if (this.userForm.valid) {
      //console.log(this.userForm.value.)
      let userData = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        email: this.userForm.value.email,
        roles: [this.userForm.value.role],
      };

      let profileData = {
        name: this.userForm.value.person?.name,
        lastName: this.userForm.value.person?.lastName,
      };

      this.api.signUp(userData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            localStorage.setItem(
              'user',
              JSON.stringify({ loggedIn: true, data: res.resource })
            );
            localStorage.setItem('token', JSON.stringify(res.resource.token));

            this.profileService.postProfile(profileData).subscribe({
              next: (res) => {
                console.log('Sign up successfull');
              },
              error: (err) => {
                console.log('PROFILE ERROR: ', err);
              },
            });
          }
          //console.log('Sign Up successful !!');
          //this.userForm.reset();
          //this.router.navigate(['signin']);
        },
        error: (err) => {
          console.log('Something went wrong !!', err.error);
          this.errorMessage = err.error;
        },
      });
    }
  }
}
