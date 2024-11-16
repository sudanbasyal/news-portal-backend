import { User } from "../../../entity/User";

export const mockUser = {
  id: "123",
  email: "test@example.com",
  password: "hashedPassword",
  roles: [
    {
      name: "admin",
      permissions: [
        { name: "users.get" },
        { name: "users.post" },
        { name: "users.delete" },
        { name: "workouts.get" },
        { name: "workouts.put" },
        { name: "workouts.delete" },
        { name: "exercises.add" },
        { name: "exercises.get" },
        { name: "exercises.delete" },
      ],
    },
  ],
} as unknown as User;
