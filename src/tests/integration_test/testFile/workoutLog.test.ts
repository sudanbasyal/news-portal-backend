import * as sinon from "sinon";
import { AppDataSource } from "../../../dataSource";
import { WorkoutLog } from "../../../entity/WorkoutLog";
import { WorkoutLogInput } from "../../../interface/workoutLog";
import {
  addWorkoutLog,
  getWorkoutLogsForLast7Days,
  userReport,
} from "../../../service/workoutLog";
import { BadRequestError } from "../../../error/BadRequestError";
import { ConflictError } from "../../../error/ConflictError";
import assert from "assert";
import dayjs from "dayjs";
import * as workoutPlanService from "../../../service/workoutPlan";
import { mockWorkoutLogInput } from "../testData/workoutLog.test";

describe("Workout Log Service Integration Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let workoutLogRepositoryStub: sinon.SinonStubbedInstance<any>;
  let workoutPlanServiceStub: sinon.SinonStubbedInstance<any>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    workoutLogRepositoryStub = sandbox.stub(
      AppDataSource.getRepository(WorkoutLog),
    );
    workoutPlanServiceStub = sandbox.stub(workoutPlanService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("addWorkoutLog", () => {
    it("should throw BadRequestError if workout plan does not exist", async () => {
      workoutPlanServiceStub.findPlanById.resolves(null); // Stub: plan does not exist

      try {
        await addWorkoutLog(mockWorkoutLogInput);
        assert.fail("Expected BadRequestError not thrown");
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "the workout plan doesnt exist");
      }
    });

    it("should throw ConflictError if a workout log already exists for the day", async () => {
      workoutPlanServiceStub.findPlanById.resolves(true); // Stub: plan exists
      workoutLogRepositoryStub.findOne.resolves(mockWorkoutLogInput); // Existing log for the day

      try {
        await addWorkoutLog(mockWorkoutLogInput);
        assert.fail("Expected ConflictError not thrown");
      } catch (error) {
        assert.ok(error instanceof ConflictError);
        assert.strictEqual(
          error.message,
          "A workout log already exists for this day",
        );
      }
    });
  });

  describe("getWorkoutLogsForLast7Days", () => {
    it("should retrieve workout logs for the last 7 days", async () => {
      const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day").toDate();
      const today = dayjs().endOf("day").toDate();
      const mockLogs = [mockWorkoutLogInput];

      workoutLogRepositoryStub.find.resolves(mockLogs);

      const result = await getWorkoutLogsForLast7Days(
        mockWorkoutLogInput.userId,
      );

      assert.deepStrictEqual(result, mockLogs);
      assert.strictEqual(workoutLogRepositoryStub.find.callCount, 1);
    });
  });

  describe("userReport", () => {
    it("should generate a user report for the last 7 days", async () => {
      const mockLogs = [mockWorkoutLogInput];

      workoutLogRepositoryStub.find.resolves(mockLogs);

      const result = await userReport(mockWorkoutLogInput.userId);

      assert.deepStrictEqual(result, mockLogs);
      assert.strictEqual(workoutLogRepositoryStub.find.callCount, 1);
    });
  });
});
