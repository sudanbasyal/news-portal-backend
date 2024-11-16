import sinon from "sinon";
import { exercisesRepository } from "../../../service/exercise";
import { Exercise } from "../../../entity/Exercises";
import * as exerciseService from "../../../service/exercise";
import { BadRequestError } from "../../../error/BadRequestError";
import { mockExercise } from "../testData/exercise.test";

describe("Exercise Service", () => {
  let exerciseRepositoryStub: sinon.SinonStubbedInstance<
    typeof exercisesRepository
  >;

  beforeEach(() => {
    exerciseRepositoryStub = sinon.stub(exercisesRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getExerciseById", () => {
    it("should return exercise if it exists", async () => {
      exerciseRepositoryStub.findOne.resolves(mockExercise);

      const result = await exerciseService.getExerciseById(1);

      if (JSON.stringify(result) !== JSON.stringify(mockExercise)) {
        throw new Error("Expected result to match mockExercise");
      }
      sinon.assert.calledOnceWithExactly(exerciseRepositoryStub.findOne, {
        where: { id: 1 },
      });
    });

    it("should throw BadRequestError if exercise doesn't exist", async () => {
      exerciseRepositoryStub.findOne.resolves(null);

      try {
        await exerciseService.getExerciseById(1);
        throw new Error("Expected BadRequestError was not thrown");
      } catch (error) {
        if (!(error instanceof BadRequestError)) {
          throw new Error("Expected error to be instance of BadRequestError");
        }
        if (error.message !== "following exercise doesnt exist") {
          throw new Error("Error message does not match expected value");
        }
      }
    });
  });

  describe("getExercises", () => {
    it("should return all exercises if they exist", async () => {
      exerciseRepositoryStub.find.resolves([mockExercise]);

      const result = await exerciseService.getExercises();

      if (JSON.stringify(result) !== JSON.stringify([mockExercise])) {
        throw new Error("Expected result to match [mockExercise]");
      }
      sinon.assert.calledOnce(exerciseRepositoryStub.find);
    });

    it("should throw BadRequestError if no exercises exist", async () => {
      exerciseRepositoryStub.find.resolves([]);

      try {
        await exerciseService.getExercises();
        throw new Error("Expected BadRequestError was not thrown");
      } catch (error) {
        if (!(error instanceof BadRequestError)) {
          throw new Error("Expected error to be instance of BadRequestError");
        }
        if (error.message !== "no exercises at the current moment") {
          throw new Error("Error message does not match expected value");
        }
      }
    });
  });

  describe("newExercise", () => {
    it("should create a new exercise if it doesn't exist", async () => {
      exerciseRepositoryStub.findOne.resolves(null);
      const saveStub = exerciseRepositoryStub.save.resolves(mockExercise);

      const result = await exerciseService.newExercise(mockExercise);

      if (result !== true) {
        throw new Error("Expected result to be true");
      }
      sinon.assert.calledOnceWithExactly(exerciseRepositoryStub.findOne, {
        where: { name: mockExercise.name },
      });
      sinon.assert.calledOnce(saveStub);
    });

    it("should throw BadRequestError if exercise with the same name already exists", async () => {
      exerciseRepositoryStub.findOne.resolves(mockExercise);

      try {
        await exerciseService.newExercise(mockExercise);
        throw new Error("Expected BadRequestError was not thrown");
      } catch (error) {
        if (!(error instanceof BadRequestError)) {
          throw new Error("Expected error to be instance of BadRequestError");
        }
        if (error.message !== "Exercise with this name already exists.") {
          throw new Error("Error message does not match expected value");
        }
      }
    });
  });
});
