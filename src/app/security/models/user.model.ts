import { FormControl, FormGroup } from '@angular/forms';
import { Focus } from './focus.model';
import { Person } from './person.model';
import { Role } from './role.model';

export interface User {
  id?: FormControl<number>;
  person?: FormGroup<Person>;
  role?: FormControl<Role>;
  email?: FormControl<string>;
  username?: FormControl<string>;
  password?: FormControl<string>;
}
