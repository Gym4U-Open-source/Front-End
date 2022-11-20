import { Exercice } from './exercice.model';

export interface ExerciseInstruction {
  id: number;
  exercise: Exercice;
  name: string;
  sets: number;
  timePerSet: number;
  status: string;
  date: string;
}

export interface Workout {
  id: number;
  userId: number;
  title: string;
  content: string;
  tag: string;
  updateAt: Date;
  owner: string;
  name?: string;
  exercises?: ExerciseInstruction[];
  status?: string;
  date?: Date;
}
