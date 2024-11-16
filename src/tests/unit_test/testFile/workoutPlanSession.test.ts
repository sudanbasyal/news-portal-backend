import sinon from "sinon";
import assert from "assert";
import * as workoutPlanSessionService from "../../../service/workoutPlanSession";
import { BadRequestError } from "../../../error/BadRequestError";
import { WorkoutSession } from "../../../entity/WorkoutPlanSession";

describe("WorkoutPlanSessionService", () => {
  const mockSession = new WorkoutSession();
  mockSession.comments = "Morning Session";
  mockSession.scheduledAt = new Date("2024-10-01T10:00:00");

  afterEach(() => {
    sinon.restore();
  });

  describe("addWorkoutSession", () => {
    it("should throw BadRequestError if the session already exists", async () => {
      const sessionExistStub = sinon
        .stub(workoutPlanSessionService, "workoutSessionExist")
        .resolves(true);

      try {
        await workoutPlanSessionService.addWorkoutSession(1, mockSession);
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected BadRequestError");
        assert.strictEqual(
          error.message,
          "session already exists and cant be created",
        );
      }

      assert(sessionExistStub.calledOnce);
    });

    it("should create a new session if it does not exist", async () => {
      const sessionExistStub = sinon
        .stub(workoutPlanSessionService, "workoutSessionExist")
        .resolves(false);

      const newSessionStub = sinon
        .stub(workoutPlanSessionService, "newSession")
        .resolves();

      const result = await workoutPlanSessionService.addWorkoutSession(
        1,
        mockSession,
      );

      assert.strictEqual(result, true);
      assert(sessionExistStub.calledOnce);
      assert(newSessionStub.calledOnce);
    });
  });

  describe("updateWorkoutSession", () => {
    it("should throw BadRequestError if session with same date already exists", async () => {
      const sessionExistStub = sinon
        .stub(workoutPlanSessionService, "workoutSessionExist")
        .resolves(true);

      try {
        await workoutPlanSessionService.updateWorkoutSession(1, mockSession);
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected BadRequestError");
        assert.strictEqual(
          error.message,
          "session already exists and cant be created",
        );
      }

      assert(sessionExistStub.calledOnce);
    });

    it("should update the session if no conflict exists", async () => {
      const sessionExistStub = sinon
        .stub(workoutPlanSessionService, "workoutSessionExist")
        .resolves(false);

      const updateSessionStub = sinon
        .stub(workoutPlanSessionService, "updateSession")
        .resolves();

      const result = await workoutPlanSessionService.updateWorkoutSession(
        1,
        mockSession,
      );

      assert.strictEqual(result, true);
      assert(sessionExistStub.calledOnce);
      assert(updateSessionStub.calledOnce);
    });
  });
});
