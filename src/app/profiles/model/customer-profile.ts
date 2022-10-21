import {Workout} from "../../Fitness/models/workout";

export interface CustomerProfile{
  id: number;
  name: string;
  lastName: string;
  email: string;
  workouts: Workout[];
}
