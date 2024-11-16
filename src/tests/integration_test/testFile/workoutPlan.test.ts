import sinon from "sinon";
import assert from "assert";

import { AppDataSource } from "../../../dataSource";

import { WorkoutPlan } from "../../../entity/WorkoutPlan";

import { WorkoutSession } from "../../../entity/WorkoutPlanSession";
import { BadRequestError } from "../../../error/BadRequestError";
import * as workoutPlanService from "../../../service/workoutPlan";

import { mockWorkoutPlan } from "../testData/workoutPlan.test";

interface MockWorkoutSession
  extends Omit<WorkoutSession, "comments" | "deletedAt" | "workoutPlan"> {}

describe("Workout Plan Service Tests", function () {
  let findOneStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let saveStub: sinon.SinonStub;
  let softDeleteStub: sinon.SinonStub;

  beforeEach(function () {
    const repository = AppDataSource.getRepository(WorkoutPlan);
    findOneStub = sinon.stub(repository, "findOne");
    findStub = sinon.stub(repository, "find");
    saveStub = sinon.stub(repository, "save");
    softDeleteStub = sinon.stub(repository, "softDelete");
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("addPlan", function () {
    it("should successfully create a new workout plan", async function () {
      const newPlan = {
        name: "New Workout Plan",
        userId: 1,
      };
      findOneStub.resolves(null);
      saveStub.resolves(mockWorkoutPlan);

      const result = await workoutPlanService.addPlan(newPlan);

      assert.strictEqual(result, true);
      assert(findOneStub.calledOnce);
      assert(saveStub.calledOnce);
    });

    it("should throw BadRequestError if plan name already exists", async function () {
      const existingPlan = {
        name: "Existing Plan",
        userId: 1,
      };
      findOneStub.resolves(mockWorkoutPlan);

      await assert.rejects(
        async () => await workoutPlanService.addPlan(existingPlan),
        BadRequestError,
        "plan already exists",
      );
      assert(findOneStub.calledOnce);
      assert(saveStub.notCalled);
    });
  });

  describe("getAllPlans", function () {
    it("should return all plans for a user", async function () {
      const userId = 1;
      findStub.resolves([mockWorkoutPlan, { ...mockWorkoutPlan, id: "2" }]);

      const result = await workoutPlanService.getAllPlans(userId);

      assert.strictEqual(result.length, 2);
      assert(
        findStub.calledWith({
          where: { user: { id: userId } },
          relations: ["user", "workoutPlanExercises", "workoutSessions"],
        }),
      );
    });

    it("should throw BadRequestError if user has no plans", async function () {
      const userId = 1;
      findStub.resolves([]);

      await assert.rejects(
        async () => await workoutPlanService.getAllPlans(userId),
        BadRequestError,
        "no existing plans of the user",
      );
    });
  });

  describe("getPlan", function () {
    it("should return specific plan for a user", async function () {
      const planId = 1;
      const userId = 1;
      findOneStub.resolves(mockWorkoutPlan);

      const result = await workoutPlanService.getPlan(planId, userId);

      assert.deepStrictEqual(result, mockWorkoutPlan);
      assert(
        findOneStub.calledWith({
          where: { id: planId.toString(), user: { id: userId } },
          relations: ["user", "workoutPlanExercises", "workoutSessions"],
        }),
      );
    });

    it("should throw BadRequestError if plan doesn't exist", async function () {
      const planId = 999;
      const userId = 1;
      findOneStub.resolves(null);

      await assert.rejects(
        async () => await workoutPlanService.getPlan(planId, userId),
        BadRequestError,
        "plan doesnt exist",
      );
    });
  });

  describe("removePlan", function () {
    it("should successfully delete a plan", async function () {
      const planId = 1;
      softDeleteStub.resolves({ affected: 1 });

      const result = await workoutPlanService.removePlan(planId);

      assert.strictEqual(result, true);
      assert(softDeleteStub.calledWith(planId));
    });
  });

  describe("findPlanById", function () {
    it("should return plan when found", async function () {
      const planId = 1;
      findOneStub.resolves(mockWorkoutPlan);

      const result = await workoutPlanService.findPlanById(planId);

      assert.deepStrictEqual(result, mockWorkoutPlan);
      assert(
        findOneStub.calledWith({
          where: { id: planId.toString() },
        }),
      );
    });

    it("should return null when plan not found", async function () {
      const planId = 999;
      findOneStub.resolves(null);

      const result = await workoutPlanService.findPlanById(planId);

      assert.strictEqual(result, null);
    });
  });
});
