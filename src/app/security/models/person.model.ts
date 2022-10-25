import { FormControl } from '@angular/forms';

export interface Person {
  id: FormControl<number | null>;
  name: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
}
