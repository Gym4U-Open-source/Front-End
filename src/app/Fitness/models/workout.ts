import {Exercice} from "./exercice.model";

export interface  ExerciseInstruction {
  id: number;
  exercise: Exercice;
  sets: number;
  timePerSet: number;
  status: string;
}

export interface Workout{
  id: number;
  name: string;
  exercises: ExerciseInstruction[];
  status: string;
  date: string;
}
