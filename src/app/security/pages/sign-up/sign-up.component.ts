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
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  role: boolean = false;
  userForm = new FormGroup<User>({
    person: new FormGroup({
      name: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      id: new FormControl(),
    }),
    role: new FormControl(Role.NORMAL, { nonNullable: true }),
    focus: new FormControl(Focus.TO_TRAIN, { nonNullable: true }),
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: UserService
  ) {}

  ngOnInit(): void {}

  signUp() {
    if (this.userForm.valid) {
      this.userForm.patchValue({
        person: {
          id: Date.now(),
        },
      });
      this.api.postUser(this.userForm).subscribe({
        next: () => {
          console.log('Sign Up successful !!');
          this.userForm.reset();
          this.router.navigate(['signin']);
        },
        error: () => {
          console.log('Something went wrong !!');
        },
      });
    }
  }

  setRole() {
    if (this.userForm.get('role')?.value === Role.COACH) {
      this.role = true;
      this.userForm.patchValue({ focus: Focus.PERSONAL_TRAINER });
    } else {
      this.role = false;
      this.userForm.patchValue({ focus: Focus.TO_TRAIN });
    }
  }
}
