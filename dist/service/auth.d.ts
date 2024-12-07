import { User } from "../interface/user";
export declare const login: (body: Pick<User, "email" | "password">) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const logout: (refreshToken: string) => Promise<{
    accessToken: null;
    refreshToken: null;
}>;
