import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Toolbar Options
  open: boolean = true;
  options: any = [
    [
      {
        title: 'Posts',
        icon: 'photo_filter',
        link: 'posts',
        isActive: false,
        role: ['COACH', 'NORMAL'],
      },
      {
        title: 'Customers',
        icon: 'person_outline',
        link: 'customers',
        isActive: false,
        role: ['COACH'],
      },
      {
        title: 'Inbox',
        icon: 'chat_bubble_outline',
        link: 'inbox',
        isActive: false,
        role: ['COACH', 'NORMAL'],
      },
      {
        title: 'Exercises',
        icon: 'fitness_center',
        link: 'exercises',
        gap: true,
        isActive: false,
        role: ['COACH'],
      },
      {
        title: 'Workouts',
        icon: 'grid_on',
        link: 'workouts',
        isActive: false,
        role: ["COACH", "NORMAL"],
      },
      {
        title: 'Logo out',
        icon: 'power_settings_new',
        isActive: false,
        role: ["COACH", "NORMAL"],
      },
    ],
    [
      { title: 'signin', icon: 'input', link: 'signin', isActive: false },
      { title: 'signup', icon: 'line_style', link: 'signup', isActive: false },
    ],
  ];

  title = 'Front-End';
  control = new FormControl('');
  streets: string[] = [
    'Champs-Élysées',
    'Lombard Street',
    'Abbey Road',
    'Fifth Avenue',
  ];
  filteredStreets!: Observable<string[]>;
  userData!: any;

  @ViewChild('sidenav', { static: true }) public sidenav!: MatSidenav;

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('USER ON APP: ', this.userData);
    //console.log(this.userData.data.roles.length)
    console.log(this.options[0][0].role);
    this.router.navigate(['/home']);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  logout() {
    console.log('logout');
    let _tmp = { loggedIn: false, data: {} };
    localStorage.setItem('user', JSON.stringify(_tmp));
    window.location.reload();
  }

  setActive(route: string) {
    this.options.forEach((element: any, i: number) => {
      element.forEach((element: any, j: number) => {
        if (this.options[i][j].isActive === true) {
          this.options[i][j].isActive = false;
        }
        if (element.title === route) {
          this.options[i][j].isActive = true;
        }
      });
    });
    if (window.innerWidth < 1024) this.setOpen();
  }

  setOpen() {
    this.open = !this.open;
  }
}
