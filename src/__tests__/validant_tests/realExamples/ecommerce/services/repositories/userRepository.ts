import { userUndefinedError, duplicateUserError } from "../errors";

export type UserType = "customer" | "tenant"

export type User = {
    email: string
    fullName: string
    password: string
    userType: UserType
}

export interface UserRepository {
    addUserAsync: (user: User) => Promise<void>;
    getUserAsync: (email: string) => Promise<User | undefined>
}

export function createUserRepository(userDatabase: User[]): UserRepository {
    function addUserAsync(user: User): Promise<void> {
        if (!user) throw userUndefinedError;

        return new Promise((resolve) => {
            setTimeout(async () => {
                const existingUser = await getUserAsync(user.email);
                if (existingUser) throw duplicateUserError;

                userDatabase.push(user);
                resolve()
                return
            }, 100);
        });
    }

    function getUserAsync(email: string): Promise<User | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingUser = userDatabase.find(user => user.email === email);
                if (existingUser) {
                    resolve(existingUser);
                } else {
                    resolve(undefined);
                }
            }, 100);
        });
    }

    return {
        addUserAsync,
        getUserAsync
    };
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
