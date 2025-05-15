import { minNumber, required } from "../../rules"
import { AsyncValidationRule } from "../../types/AsyncValidationRule"

type User = {
    email: string
    age: number
}

type RegistrationRequest = {
    email: string
    age: number
}

const fetchUserByEmail = jest.fn(async (email: string) => {
    if (email === "exist@gmail.com") {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingUser: User = {
                    email: "exist@gmail.com",
                    age: 25
                };

                if (email === existingUser.email) {
                    resolve(existingUser);
                } else {
                    resolve(undefined);
                }
            }, 10000); // 100ms delay
        });
    }
    return undefined;
});

function emailHasBeenRegisteredAsyncRule() {
    return async function (email: string) {
        const existingUserByEmail = await fetchUserByEmail(email);
        if (existingUserByEmail) {
            return {
                isValid: false,
                errorMessage: `The email ${email} has been registered`
            };
        }
        return { isValid: true };
    };
}

const registrationRule: AsyncValidationRule<RegistrationRequest> = {
    email: [
        required(),
        emailHasBeenRegisteredAsyncRule()
    ],
    age: [
        required(),
        minNumber(1)
    ]
};

describe("ValidationRuleAsync Test", () => {
    it("Ensure each property does have rule function", () => {
        for (const [property, rules] of Object.entries(registrationRule)) {
            expect(Array.isArray(rules)).toBe(true);
            rules.forEach((rule, index) => {
                expect(typeof rule).toBe("function");
            });
        }
    });
});
