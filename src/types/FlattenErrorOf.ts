import { ArrayElementType, PossiblyUndefined } from "./ErrorOf";
import { RuleViolation } from "./ValidationRule";

export type ArrayErrorLevel = "array" | "arrayElement"

export interface ArrayRuleViolation {
    errorLevel: ArrayErrorLevel
    errorMessage: string;
    ruleName: string;
    attemptedValue: any;
}

export interface ArrayItemRuleViolation<T> {
    errorLevel: ArrayErrorLevel
    index: number,
    errors: FlattenErrorOf<T>,
    attemptedValue: T | null | undefined
}

export type FlattenErrorOf<T extends Object> = { [key in keyof T]?:
    T[key] extends Date ? RuleViolation[]
    : T[key] extends PossiblyUndefined<Array<any>> ? FlattenErrorOfArray<T[key]>[]
    : T[key] extends PossiblyUndefined<object> ? FlattenErrorOf<T[key]>
    : RuleViolation[] }

export type FlattenErrorOfArray<TArray> = ArrayRuleViolation | ArrayItemRuleViolation<ArrayElementType<TArray>> 