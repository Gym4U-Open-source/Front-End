import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

interface storageData {
  loggedIn: boolean;
  data: any;
}

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

  constructor(
    private router: Router,
    private api: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.userData.loggedIn === true) {
      console.log(this.userData);
      this.router.navigate(['/']);
    }
  }

  async signIn() {
    if (this.userForm.valid) {
      this.loading = true;
      let dataToStorage = {
        loggedIn: false,
        data: {
          user: {},
          profile: {},
        },
      };

      await this.api
        .signIn(this.userForm.value)
        .toPromise()
        .then((res) => {
          localStorage.setItem('token', JSON.stringify(res.resource.token));
          console.log(res.resource);
          dataToStorage.data.user = res.resource;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });

      await this.profileService
        .getProfile()
        .toPromise()
        .then((res) => {
          dataToStorage.data.profile = res;
          dataToStorage.loggedIn = true;
          console.log(res);
          localStorage.setItem('user', JSON.stringify(dataToStorage));
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });

      console.log(dataToStorage);
      if (dataToStorage.loggedIn) window.location.reload();
      this.loading = false;
    }
  }
}
