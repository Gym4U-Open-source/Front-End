import {Workout} from "../../Fitness/models/workout";

export interface CustomerProfile{
  id: number;
  name: string;
  lastName: string;
  email: string;
  workouts: Workout[];
}

/*export interface CustomerProfile{
  id: number;
  name: string;
  lastName: string;
  userType: string;
  email: string;
  password: string;
} */
