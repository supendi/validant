import { ErrorOf, RuleViolation } from "../types";
import { ArrayItemRuleViolation, ArrayRuleViolation, FlattenErrorOf } from "../types/FlattenErrorOf";

export function flattenError<T extends object>(error: ErrorOf<T>): FlattenErrorOf<T> {
    if (!error) return {} as FlattenErrorOf<T>;

    const result: any = {};

    for (const key in error) {
        const value = error[key];

        // Case 1: Field is a primitive or Date (array of RuleViolation)
        if (Array.isArray(value) && value.length > 0 && isRuleViolationArray(value)) {
            result[key] = value.map(rv => ({
                errorMessage: rv.errorMessage,
                attemptedValue: rv.attemptedValue,
                ruleName: rv.ruleName
            }));
            continue;
        }

        // Case 2: Field is an object (recursive)
        if (value && typeof value === "object" && !Array.isArray(value) && !isErrorOfArray(value)) {
            result[key] = flattenError(value as ErrorOf<any>);
            continue;
        }

        // Case 3: Field is an array error object (ErrorOfArray)
        if (isErrorOfArray(value)) {
            const arr: (ArrayRuleViolation | ArrayItemRuleViolation<any>)[] = [];

            // Array-level errors
            if (value.arrayErrors && Array.isArray(value.arrayErrors)) {
                for (const arrErr of value.arrayErrors) {
                    arr.push({
                        errorLevel: "array",
                        errorMessage: arrErr.errorMessage,
                        ruleName: arrErr.ruleName,
                        attemptedValue: arrErr.attemptedValue
                    });
                }
            }

            // Array element errors
            if (value.arrayElementErrors && Array.isArray(value.arrayElementErrors)) {
                for (const elemErr of value.arrayElementErrors) {
                    arr.push({
                        errorLevel: "arrayElement",
                        index: elemErr.index,
                        errors: flattenError(elemErr.errors as any),
                        attemptedValue: elemErr.attemptedValue
                    });
                }
            }

            result[key] = arr;
            continue;
        }
    }

    return result as FlattenErrorOf<T>;
}

// Helpers
function isRuleViolationArray(arr: any[]): arr is RuleViolation[] {
    return arr.length > 0 && typeof arr[0] === "object" && "errorMessage" in arr[0] && "ruleName" in arr[0];
}

function isErrorOfArray(obj: any): obj is { arrayErrors?: RuleViolation[], arrayElementErrors?: any[] } {
    return obj && (Array.isArray(obj.arrayErrors) || Array.isArray(obj.arrayElementErrors));
}