import { Workout } from "src/app/fitness/models/workout.model";

export interface CustomerProfile{
  id: number;
  name: string;
  lastName: string;
  email: string;
  workouts: Workout[];
}
