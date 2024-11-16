import { WorkoutLogInput } from "../../../interface/workoutLog";

export const mockWorkoutLogInput: WorkoutLogInput = {
  userId: 1,
  workoutPlanId: 1,
  logDate: new Date(),
  notes: "Felt great!",
  completed: true,
};
