import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// CUSTOM MODULES
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';
import { ExercisesComponent } from './fitness/pages/exercises/exercises.component';
import { AddExerciseDialogComponent } from './fitness/pages/components/add-exercise-dialog/add-exercise-dialog.component';
import { PostsComponent } from './comunity/pages/posts/posts.component';
import { CustomersComponent } from './profiles/pages/customers/customers.component';
import { AddCustomerDialogComponent } from './profiles/components/add-customer-dialog/add-customer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AddPostDialogComponent } from './comunity/components/add-post-dialog/add-post-dialog.component';
import { ViewPostCommentsComponent } from './comunity/components/view-post-comments/view-post-comments.component';
import { SignInComponent } from './security/pages/sign-in/sign-in.component';
import { SignUpComponent } from './security/pages/sign-up/sign-up.component';
import { ChatBoxComponent } from './comunity/pages/chat-box/chat-box.component';
import { WorkoutsComponent } from './fitness/pages/workouts/workouts.component';
import { CustomerWorkoutsComponent } from './profiles/pages/customer-workouts/customer-workouts.component';
import { CustomerWorkoutExercisesComponent } from './profiles/pages/customer-workout-exercises/customer-workout-exercises.component';
import { AddCustomerWorkoutDialogComponent } from './profiles/components/add-customer-workout-dialog/add-customer-workout-dialog.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './public/pages/home/home.component';

// ROUTES
import { AppRoutingModule } from './app-routing-module';
import { PostCardComponent } from './comunity/components/post-card/post-card.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { PostHomeCardComponent } from './public/components/post-home-card/post-home-card.component';
import { AddWorkoutDialogComponent } from './fitness/pages/components/add-workout-dialog/add-workout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    ExercisesComponent,
    AddExerciseDialogComponent,
    PostsComponent,
    CustomersComponent,
    AddCustomerDialogComponent,
    AddPostDialogComponent,
    ViewPostCommentsComponent,
    SignInComponent,
    SignUpComponent,
    ChatBoxComponent,
    WorkoutsComponent,
    CustomerWorkoutsComponent,
    CustomerWorkoutExercisesComponent,
    AddCustomerWorkoutDialogComponent,
    PostCardComponent,
    PostHomeCardComponent,
    AddWorkoutDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
