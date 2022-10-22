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
import { ExercisesComponent} from "./Fitness/pages/exercises/exercises.component";
import { AddExerciseDialogComponent} from "./Fitness/pages/components/add-exercise-dialog/add-exercise-dialog.component";
import { PostsComponent } from './comunity/pages/posts/posts.component';
import { CustomersComponent } from './profiles/pages/customers/customers.component';
import { AddCustomerDialogComponent } from './profiles/components/add-customer-dialog/add-customer-dialog.component';
import { CustomerComponent } from './profiles/pages/customer/customer.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { AddPostDialogComponent } from './comunity/components/add-post-dialog/add-post-dialog.component';
import { ViewPostCommentsComponent } from './comunity/components/view-post-comments/view-post-comments.component';
import { SignInComponent } from './security/pages/sign-in/sign-in.component';
import { SignUpComponent } from './security/pages/sign-up/sign-up.component';
import { WorkoutsComponent } from './Fitness/pages/workouts/workouts.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'customers', component: CustomersComponent},
  { path: 'customer', component: CustomerComponent},
  { path: 'exercises', component: ExercisesComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'posts', component: PostsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ExercisesComponent,
    AddExerciseDialogComponent,
    PostsComponent,
    CustomersComponent,
    AddCustomerDialogComponent,
    CustomerComponent,
    AddPostDialogComponent,
    ViewPostCommentsComponent,
    SignInComponent,
    SignUpComponent,
    WorkoutsComponent
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
    MatDialogModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
