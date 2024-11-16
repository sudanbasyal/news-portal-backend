import * as sinon from "sinon";

import assert from "assert";

import { AppDataSource } from "../../../dataSource";

import { WorkoutPlanExercise } from "../../../entity/WorkoutPlanExercise";
import * as workoutPlanService from "../../../service/workoutPlan";
import * as exerciseService from "../../../service/exercise";

import { BadRequestError } from "../../../error/BadRequestError";

import {
  addWorkoutPlanExercises,
  removeWorkoutPlanExercises,
  updateWorkoutPlanExercises,
} from "../../../service/workoutPlanExercise";

import {
  mockExercise,
  mockWorkoutPlan,
  mockWorkoutPlanExercise,
} from "../testData/workoutPlanExercise.test";

describe("Workout Plan Exercise Service Integration Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let repositoryStub: sinon.SinonStubbedInstance<any>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    repositoryStub = sandbox.stub(
      AppDataSource.getRepository(WorkoutPlanExercise),
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("addWorkoutPlanExercises", () => {
    it("should successfully add an exercise to the workout plan", async () => {
      sandbox
        .stub(workoutPlanService, "findPlanById")
        .resolves(mockWorkoutPlan);
      sandbox.stub(exerciseService, "getExerciseById").resolves(mockExercise);
      repositoryStub.findOne.resolves(null);
      repositoryStub.save.resolves({ ...mockWorkoutPlanExercise, id: 1 });

      const result = await addWorkoutPlanExercises(mockWorkoutPlanExercise);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(
        workoutPlanService.findPlanById as sinon.SinonStub,
      );
      sinon.assert.calledOnce(
        exerciseService.getExerciseById as sinon.SinonStub,
      );
      sinon.assert.calledOnce(repositoryStub.save);
    });

    it("should throw BadRequestError if exercise already exists in the plan", async () => {
      // Setup stubs
      sandbox
        .stub(workoutPlanService, "findPlanById")
        .resolves(mockWorkoutPlan);
      sandbox.stub(exerciseService, "getExerciseById").resolves(mockExercise);
      repositoryStub.findOne.resolves(mockWorkoutPlanExercise);

      try {
        await addWorkoutPlanExercises(mockWorkoutPlanExercise);
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(
          error.message,
          "This exercise is already in the workout plan",
        );
      }
    });

    it("should throw BadRequestError if workout plan does not exist", async () => {
      // Setup stubs
      sandbox.stub(workoutPlanService, "findPlanById").resolves(null);

      try {
        await addWorkoutPlanExercises(mockWorkoutPlanExercise);
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "plan doesnot exist");
      }
    });
  });

  describe("removeWorkoutPlanExercises", () => {
    it("should throw BadRequestError if exercise not found in plan", async () => {
      sandbox
        .stub(workoutPlanService, "findPlanById")
        .resolves(mockWorkoutPlan);
      sandbox.stub(exerciseService, "getExerciseById").resolves(mockExercise);
      repositoryStub.findOne.resolves(null);

      try {
        await removeWorkoutPlanExercises({
          workoutPlanId: mockWorkoutPlanExercise.workoutPlanId,
          exerciseId: mockWorkoutPlanExercise.exerciseId,
          weight: mockWorkoutPlanExercise.weight,
        });
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "No exercise found to delete");
      }
    });
  });

  describe("updateWorkoutPlanExercises", () => {
    it("should successfully update exercise details in the workout plan", async () => {
      sandbox
        .stub(workoutPlanService, "findPlanById")
        .resolves(mockWorkoutPlan);
      repositoryStub.findOne.resolves({ ...mockWorkoutPlanExercise, id: 1 });
      repositoryStub.update.resolves({ affected: 1 });

      const updateData = {
        ...mockWorkoutPlanExercise,
        updatedSets: 5,
        updatedReps: 15,
      };

      const result = await updateWorkoutPlanExercises(updateData);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(
        workoutPlanService.findPlanById as sinon.SinonStub,
      );
      sinon.assert.calledOnce(repositoryStub.update);
    });

    it("should throw BadRequestError if exercise not found in plan", async () => {
      sandbox
        .stub(workoutPlanService, "findPlanById")
        .resolves(mockWorkoutPlan);
      repositoryStub.findOne.resolves(null);

      try {
        await updateWorkoutPlanExercises(mockWorkoutPlanExercise);
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "Exercise not found in workout plan");
      }
    });

    it("should throw BadRequestError if workout plan does not exist", async () => {
      sandbox.stub(workoutPlanService, "findPlanById").resolves(null);

      try {
        await updateWorkoutPlanExercises(mockWorkoutPlanExercise);
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "Workout plan does not exist");
      }
    });
  });
});
