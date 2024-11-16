export const mockWorkoutPlan: any = {
  id: "1",
  name: "Test Plan",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  user: { id: 1, name: "Test User" },
};

export const mockWorkoutPlanExercise: any = {
  id: 1,
  reps: 10,
  sets: 3,
  weight: 50,
  exerciseId: 1,
  workoutPlanId: 1,
  updatedSets: 20,
  updatedReps: 20,
};

export const mockExercise: any = {
  id: 1,
  name: "Test Exercise",
};
