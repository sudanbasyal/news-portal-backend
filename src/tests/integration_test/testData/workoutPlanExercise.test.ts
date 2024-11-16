export const mockWorkoutPlan = {
  id: "123",
  name: "Test Plan",
  description: "Test Plan Description",
} as any;

export const mockExercise = {
  id: 456,
  name: "Push Ups",
  description: "Exercise Description",
} as any;

export const mockWorkoutPlanExercise = {
  workoutPlanId: mockWorkoutPlan.id,
  exerciseId: mockExercise.id,
  sets: 3,
  reps: 12,
  weight: 70,
} as any;
