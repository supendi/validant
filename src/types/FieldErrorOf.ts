import { ErrorOf, ErrorOfArray, PossiblyUndefined } from "./ErrorOf";
import { RuleViolation } from "./ValidationRule";

export type FieldErrors<T, K extends keyof T> =
    T[K] extends Date
    ? string[]
    : T[K] extends PossiblyUndefined<Array<any>>
    ? ErrorOfArray<T[K]>
    : T[K] extends PossiblyUndefined<object>
    ? ErrorOf<T[K]>
    : RuleViolation[];


export interface FieldErrorOf<T, K extends keyof T = keyof T> {
    isValid: boolean;
    fieldName: K;
    errors?: {
        [P in K]: FieldErrors<T, P>;
    };
}
