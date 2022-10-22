export interface Workout{
  id: number;
  userId: number;
  title: string;
  content: string;
  tag: string;
  exercises: number;
  updateAt: Date;
  owner: string;
}
