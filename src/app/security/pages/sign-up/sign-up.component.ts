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

  ngOnInit() {}

  async signUp() {
    if (this.userForm.valid) {
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

      await this.api
        .signUp(userData)
        .toPromise()
        .then((res) => {
          if (res.success) {
            localStorage.setItem('token', JSON.stringify(res.resource.token));
          }
        })
        .catch((err) => {
          console.log('Something went wrong !!', err.error);
          this.errorMessage = err.error;
        });

      await this.profileService
        .postProfile(profileData)
        .toPromise()
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });

      let token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
      }
    }
  }
}
