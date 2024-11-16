import { Plan } from "../../../interface/workoutPlan";

export const mockWorkoutPlan = {
  id: "1",
  name: "Test Plan",
  user: { id: 1 },
  workoutPlanExercises: [],
  workoutSessions: [],
} as any;

export const mockWorkoutPlanExercise = {
  id: 1,
  reps: 10,
  sets: 3,
  weight: 50,
  exercise: { id: 1 },
  workoutPlan: { id: "1" },
};

export const mockWorkoutSession = {
  id: 1,
  comments: "Test session",
  scheduledAt: new Date(),
  workoutPlan: { id: "1" },
};
