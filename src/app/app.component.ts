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

  @ViewChild('sidenav', {static: true}) public sidenav!: MatSidenav

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.userData);

    this.router.navigate(["/home"])
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
    //--set localStorage
    let _tmp = { loggedIn: false, data: {} };
    localStorage.setItem('user', JSON.stringify(_tmp));
    window.location.reload();
  }

  sidenavOptionSelect(route: string) {
    this.sidenav.close()
    this.router.navigate([`/${route}`])
  }
}
