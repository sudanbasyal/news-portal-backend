import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";

export const userRepository = AppDataSource.getRepository(User);

export const findByEmail = async (email: string) => {
  return userRepository.findOneBy({ email });
};

export const getUser = async (id: number) => {
  return await userRepository.findOne({
    where: { id },
  });
};
