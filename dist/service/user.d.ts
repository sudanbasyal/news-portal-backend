import { User } from "../entity/User";
export declare const userRepository: import("typeorm").Repository<User>;
export declare const findByEmail: (email: string) => Promise<User | null>;
export declare const getUser: (id: number) => Promise<User | null>;
