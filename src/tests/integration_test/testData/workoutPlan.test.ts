import { WorkoutPlan } from "../../../entity/WorkoutPlan";
import { WorkoutPlanExercise } from "../../../entity/WorkoutPlanExercise";
import { WorkoutSession } from "../../../entity/WorkoutPlanSession";
import { User } from "../../../interface/user";

interface MockWorkoutSession
  extends Omit<WorkoutSession, "comments" | "deletedAt" | "workoutPlan"> {}

interface MockWorkoutPlan {
  id: string;
  name: string;
  user?: User;
  workoutPlanExercises?: WorkoutPlanExercise[];
  workoutSessions?: WorkoutSession[];
}

export const mockUser: Partial<User> = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
};

export const mockWorkoutPlanExercises: Partial<WorkoutPlanExercise>[] = [
  { id: "1", sets: 3, reps: 12 },
  { id: "2", sets: 4, reps: 10 },
];

export const mockWorkoutSessions: MockWorkoutSession[] = [
  { id: 1, scheduledAt: new Date() },
  { id: 2, scheduledAt: new Date() },
];

export const mockWorkoutPlan: MockWorkoutPlan = {
  id: "1",
  name: "Test Plan",
  user: mockUser as User,
  workoutPlanExercises: mockWorkoutPlanExercises as WorkoutPlanExercise[],
  workoutSessions: mockWorkoutSessions as WorkoutSession[],
};
