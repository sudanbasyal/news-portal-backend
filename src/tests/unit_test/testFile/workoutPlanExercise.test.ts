import assert from "assert";
import sinon from "sinon";
import * as workoutPlanService from "../../../service/workoutPlan";
import * as workoutPlanExerciseService from "../../../service/workoutPlanExercise";
import * as exerciseService from "../../../service/exercise";
import { AppDataSource } from "../../../dataSource";
import { WorkoutPlanExercise } from "../../../entity/WorkoutPlanExercise";
import { BadRequestError } from "../../../error/BadRequestError";
import { mockExercise } from "../testData/exercise.test";
import {
  mockWorkoutPlan,
  mockWorkoutPlanExercise,
} from "../testData/workoutPlanExercise.test";

describe("Workout Plan Exercise Service", () => {
  let findOneStub: sinon.SinonStub;
  let saveStub: sinon.SinonStub;
  let softDeleteStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;

  beforeEach(() => {
    findOneStub = sinon.stub(
      AppDataSource.getRepository(WorkoutPlanExercise),
      "findOne",
    );
    saveStub = sinon.stub(
      AppDataSource.getRepository(WorkoutPlanExercise),
      "save",
    );
    softDeleteStub = sinon.stub(
      AppDataSource.getRepository(WorkoutPlanExercise),
      "softDelete",
    );
    updateStub = sinon.stub(
      AppDataSource.getRepository(WorkoutPlanExercise),
      "update",
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("addWorkoutPlanExercises", () => {
    it("should throw BadRequestError if the plan does not exist", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(null);

      try {
        await workoutPlanExerciseService.addWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "plan doesnot exist");
      }
    });

    it("should throw BadRequestError if the exercise already exists in the plan", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(mockWorkoutPlan);
      sinon.stub(exerciseService, "getExerciseById").resolves(mockExercise);
      findOneStub.resolves(mockWorkoutPlanExercise);

      try {
        await workoutPlanExerciseService.addWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(
          error.message,
          "This exercise is already in the workout plan",
        );
      }

      sinon.assert.calledOnce(findOneStub);
    });

    it("should add a new exercise to the plan if it does not already exist", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(mockWorkoutPlan);
      sinon.stub(exerciseService, "getExerciseById").resolves(mockExercise);
      findOneStub.resolves(null);
      saveStub.resolves(mockWorkoutPlanExercise);

      const result = await workoutPlanExerciseService.addWorkoutPlanExercises(
        mockWorkoutPlanExercise,
      );
      assert.strictEqual(result, true, "Expected result to be true");

      sinon.assert.calledOnce(saveStub);
    });
  });

  describe("removeWorkoutPlanExercises", () => {
    it("should throw BadRequestError if the plan does not exist", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(null);

      try {
        await workoutPlanExerciseService.removeWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "plan doesnot exist");
      }
    });

    it("should throw BadRequestError if the exercise does not exist in the plan", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(mockWorkoutPlan);
      findOneStub.resolves(null);

      try {
        await workoutPlanExerciseService.removeWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "No exercise found to delete");
      }

      sinon.assert.calledOnce(findOneStub);
    });

    it("should remove an exercise from the plan if it exists", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(mockWorkoutPlan);
      findOneStub.resolves(mockWorkoutPlanExercise);
      softDeleteStub.resolves({ affected: 1 });

      const result =
        await workoutPlanExerciseService.removeWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
      assert.strictEqual(result, undefined, "Expected undefined as result");

      sinon.assert.calledOnce(softDeleteStub);
    });
  });

  describe("updateWorkoutPlanExercises", () => {
    it("should throw BadRequestError if the plan does not exist", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(null);

      try {
        await workoutPlanExerciseService.updateWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "Workout plan does not exist");
      }
    });

    it("should throw BadRequestError if the exercise is not found in the plan", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(mockWorkoutPlan);
      findOneStub.resolves(null);

      try {
        await workoutPlanExerciseService.updateWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "Exercise not found in workout plan");
      }
    });

    it("should update the exercise in the workout plan if it exists", async () => {
      sinon.stub(workoutPlanService, "findPlanById").resolves(mockWorkoutPlan);
      findOneStub.resolves(mockWorkoutPlanExercise);
      updateStub.resolves({ affected: 1 });

      const result =
        await workoutPlanExerciseService.updateWorkoutPlanExercises(
          mockWorkoutPlanExercise,
        );
      assert.strictEqual(result, true, "Expected result to be true");

      sinon.assert.calledOnce(updateStub);
    });
  });
});
