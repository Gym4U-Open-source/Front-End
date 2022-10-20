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
import { SignupComponent } from './Security/pages/signup/signup.component';
import { LoginComponent } from './Security/pages/login/login.component';
import { ExercisesComponent } from './Fitness/pages/exercises/exercises.component';
import { PostsComponent } from './components/posts/posts.component';
import { CustomersComponent } from './profiles/pages/customers/customers.component';
import { AddCustomerDialogComponent } from './profiles/components/add-customer-dialog/add-customer-dialog.component';
import { AddExerciseDialogComponent } from './Fitness/pages/components/add-exercise-dialog/add-exercise-dialog.component';
import { HomeComponent } from './public/pages/home/home.component';
import { CustomerWorkoutsComponent } from './profiles/pages/customer-workouts/customer-workouts.component';
import { CustomerWorkoutExercisesComponent } from './profiles/pages/customer-workout-exercises/customer-workout-exercises.component';
import { AddCustomerWorkoutDialogComponent } from './profiles/components/add-customer-workout-dialog/add-customer-workout-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customers', component: CustomersComponent},
  { path: 'customer-workouts/:id', component: CustomerWorkoutsComponent},
  { path: 'customer-workout-exercises/:id', component: CustomerWorkoutExercisesComponent},
  { path: 'exercises', component: ExercisesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'home', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PostsComponent,
    CustomersComponent,
    AddCustomerDialogComponent,
    ExercisesComponent,
    AddExerciseDialogComponent,
    HomeComponent,
    CustomerWorkoutsComponent,
    CustomerWorkoutExercisesComponent,
    AddCustomerWorkoutDialogComponent
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
export class AppModule { }
