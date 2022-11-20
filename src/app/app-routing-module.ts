// ROUTER MODULES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// PAGES
import { PostsComponent } from './comunity/pages/posts/posts.component';
import { ChatBoxComponent } from './comunity/pages/chat-box/chat-box.component';
import { ExercisesComponent } from './fitness/pages/exercises/exercises.component';
import { WorkoutsComponent } from './fitness/pages/workouts/workouts.component';
import { CustomerWorkoutExercisesComponent } from './profiles/pages/customer-workout-exercises/customer-workout-exercises.component';
import { CustomerWorkoutsComponent } from './profiles/pages/customer-workouts/customer-workouts.component';
import { CustomersComponent } from './profiles/pages/customers/customers.component';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { SignInComponent } from './security/pages/sign-in/sign-in.component';
import { SignUpComponent } from './security/pages/sign-up/sign-up.component';

// PATHS CONFIGURATION
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer-workouts/:id', component: CustomerWorkoutsComponent },
  {
    path: 'customer-workout-exercises/:id',
    component: CustomerWorkoutExercisesComponent,
  },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'inbox', component: ChatBoxComponent },

  // DEFAULT ROUTE
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
