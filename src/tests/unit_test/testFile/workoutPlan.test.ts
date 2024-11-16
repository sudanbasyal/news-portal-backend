import assert from "assert";
import sinon from "sinon";
import * as workoutPlanService from "../../../service/workoutPlan";
import { WorkoutPlan } from "../../../entity/WorkoutPlan";
import { BadRequestError } from "../../../error/BadRequestError";
import { AppDataSource } from "../../../dataSource";
import { mockWorkoutPlan } from "../testData/workoutPlan.test";

describe("Workout Services", () => {
  let findStub: sinon.SinonStub;
  let findOneStub: sinon.SinonStub;
  let saveStub: sinon.SinonStub;
  let softDeleteStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;

  beforeEach(() => {
    // Stubbing the repository methods
    findStub = sinon.stub(AppDataSource.getRepository(WorkoutPlan), "find");
    findOneStub = sinon.stub(
      AppDataSource.getRepository(WorkoutPlan),
      "findOne",
    );
    saveStub = sinon.stub(AppDataSource.getRepository(WorkoutPlan), "save");
    softDeleteStub = sinon.stub(
      AppDataSource.getRepository(WorkoutPlan),
      "softDelete",
    );
    updateStub = sinon.stub(AppDataSource.getRepository(WorkoutPlan), "update");
  });

  afterEach(() => {
    // Restore the default behavior after each test
    sinon.restore();
  });

  describe("Workout Plan Service", () => {
    describe("addPlan", () => {
      it("should throw a BadRequestError if the plan already exists", async () => {
        findOneStub.resolves(mockWorkoutPlan);

        try {
          await workoutPlanService.addPlan({ name: "Test Plan", userId: 1 });
          assert.fail("Expected BadRequestError to be thrown");
        } catch (error) {
          assert(
            error instanceof BadRequestError,
            "Expected a BadRequestError",
          );
          assert.strictEqual(error.message, "plan already exists");
        }

        sinon.assert.calledOnce(findOneStub);
      });

      it("should create a new plan if it does not already exist", async () => {
        findOneStub.resolves(null);
        saveStub.resolves(mockWorkoutPlan);

        const result = await workoutPlanService.addPlan({
          name: "Test Plan",
          userId: 1,
        });
        assert.strictEqual(result, true, "Expected result to be true");

        sinon.assert.calledOnce(findOneStub);
        sinon.assert.calledOnce(saveStub);
      });
    });

    describe("getAllPlans", () => {
      it("should return all plans for a user if they exist", async () => {
        findStub.resolves([mockWorkoutPlan]);

        const plans = await workoutPlanService.getAllPlans(1);
        assert(Array.isArray(plans), "Expected result to be an array");
        assert(
          plans.includes(mockWorkoutPlan),
          "Expected array to include mockWorkoutPlan",
        );

        sinon.assert.calledOnce(findStub);
      });

      it("should throw a BadRequestError if no plans are found for the user", async () => {
        findStub.resolves([]);

        try {
          await workoutPlanService.getAllPlans(1);
          assert.fail("Expected BadRequestError to be thrown");
        } catch (error) {
          assert(
            error instanceof BadRequestError,
            "Expected a BadRequestError",
          );
          assert.strictEqual(error.message, "no existing plans of the user");
        }

        sinon.assert.calledOnce(findStub);
      });
    });
  });
});
