import * as sinon from "sinon";

import assert from "assert";

import { AppDataSource } from "../../../dataSource";

import { WorkoutSession } from "../../../entity/WorkoutPlanSession";
import {
  addWorkoutSession,
  updateWorkoutSession,
  deleteSession,
} from "../../../service/workoutPlanSession";

import { BadRequestError } from "../../../error/BadRequestError";

import { mockWorkoutSession } from "../testData/workoutPlanSession.test";

describe("Workout Session Service Integration Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let repositoryStub: sinon.SinonStubbedInstance<any>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    repositoryStub = sandbox.stub(AppDataSource.getRepository(WorkoutSession));
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("addWorkoutSession", () => {
    it("should successfully add a new workout session", async () => {
      // Stub repository calls
      repositoryStub.findOne.resolves(null); // No existing session
      repositoryStub.save.resolves(mockWorkoutSession); // Simulate successful save

      const result = await addWorkoutSession(1, mockWorkoutSession);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(repositoryStub.save);
    });

    it("should throw BadRequestError if session already exists", async () => {
      repositoryStub.findOne.resolves(mockWorkoutSession);

      try {
        await addWorkoutSession(1, mockWorkoutSession);
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(
          error.message,
          "session already exists and cant be created",
        );
      }
    });
  });

  describe("updateWorkoutSession", () => {
    it("should throw BadRequestError if trying to create a session with an existing scheduled time", async () => {
      repositoryStub.findOne.resolves(mockWorkoutSession);

      try {
        await updateWorkoutSession(mockWorkoutSession.id, mockWorkoutSession);
        assert.fail("Should have thrown BadRequestError");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(
          error.message,
          "session already exists and cant be created",
        );
      }
    });
  });

  describe("deleteSession", () => {
    it("should successfully delete a workout session", async () => {
      repositoryStub.softDelete.resolves({ affected: 1 });

      const result = await deleteSession(mockWorkoutSession.id);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(repositoryStub.softDelete);
    });
  });
});
