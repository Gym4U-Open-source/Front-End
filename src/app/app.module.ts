import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/free/signup/signup.component';
import { LoginComponent } from './pages/free/login/login.component';
import { ExercisesComponent } from './pages/auth/library/exercises/exercises.component';
import { AddExerciseDialogComponent } from './components/add-exercise-dialog/add-exercise-dialog.component';
<<<<<<< HEAD
import { PostsComponent } from './components/posts/posts.component';
=======
import { CustomersComponent } from './profiles/pages/customers/customers.component';
import { AddCustomerDialogComponent } from './profiles/components/add-customer-dialog/add-customer-dialog.component';
import { CustomerComponent } from './profiles/pages/customer/customer.component';
>>>>>>> GYM-39-coach-visualizes-a-customer

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customers', component: CustomersComponent},
  { path: 'customer', component: CustomerComponent},
  { path: 'library/exercises', component: ExercisesComponent },
  { path: 'posts', component: PostsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ExercisesComponent,
    AddExerciseDialogComponent,
<<<<<<< HEAD
    PostsComponent,
=======
    CustomersComponent,
    AddCustomerDialogComponent,
    CustomerComponent,
>>>>>>> GYM-39-coach-visualizes-a-customer
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCardModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
