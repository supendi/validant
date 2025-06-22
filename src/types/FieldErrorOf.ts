import { ErrorOf, ErrorOfArray, PossiblyUndefined } from "./ErrorOf";
import { RuleViolation } from "./ValidationRule";

/**
 * Represents the error type for a specific field.
 * 
 * Mapping rules:
 * - Date fields → RuleViolation[] (validation rule violations)
 * - Array fields → ErrorOfArray<T> (array-level and element-level errors)
 * - Object fields → ErrorOf<T> (structured error objects)  
 * - Primitive fields → RuleViolation[] (validation rule violations)
 * 
 * Examples:
 * - FieldErrors<{name: string}, 'name'> = RuleViolation[]
 * - FieldErrors<{createdAt: Date}, 'createdAt'> = RuleViolation[]
 * - FieldErrors<{tags: string[]}, 'tags'> = ErrorOfArray<string[]> 
 * - FieldErrors<{profile: UserProfile}, 'profile'> = ErrorOf<UserProfile>
 */
export type FieldErrors<T, K extends keyof T> =
    T[K] extends Date ? RuleViolation[]
    : T[K] extends PossiblyUndefined<Array<any>> ? ErrorOfArray<T[K]>
    : T[K] extends PossiblyUndefined<object> ? ErrorOf<T[K]>
    : RuleViolation[];

/**
 * Represents field-level validation result.
 * 
 * The errors property will contain:
 * - For primitives (string, number, boolean): RuleViolation[] - detailed validation errors
 * - For dates: RuleViolation[] - detailed validation errors  
 * - For objects: ErrorOf<T> - structured error object with nested field errors
 * - For arrays: ErrorOfArray<T> - array errors with both array-level and element-level errors
 * 
 * @template T - The object type containing the field
 * @template K - The specific field key (defaults to any key of T)
 * 
 * @example
 * ```typescript
 * // For primitive field
 * const nameError: FieldErrorOf<{name: string}, 'name'> = {
 *   isValid: false,
 *   fieldName: 'name',
 *   errors: [
 *     { ruleName: "required", attemptedValue: "", errorMessage: "Name is required" },
 *     { ruleName: "minLength", attemptedValue: "a", errorMessage: "Name must be at least 2 characters" }
 *   ]
 * }
 * 
 * // For array field with primitive elements  
 * const tagsError: FieldErrorOf<{tags: string[]}, 'tags'> = {
 *   isValid: false,
 *   fieldName: 'tags',
 *   errors: {
 *     arrayErrors: [{ ruleName: "arrayMinLen", attemptedValue: [], errorMessage: "At least 1 tag required" }],
 *     arrayElementErrors: [
 *       { index: 0, errors: [{ ruleName: "format", attemptedValue: "bad-tag", errorMessage: "Invalid format" }], attemptedValue: "bad-tag" }
 *     ]
 *   }
 * }
 * 
 * // For object field
 * const userError: FieldErrorOf<{user: {name: string, age: number}}, 'user'> = {
 *   isValid: false,
 *   fieldName: 'user', 
 *   errors: {
 *     name: [{ ruleName: "required", attemptedValue: "", errorMessage: "Name is required" }],
 *     age: [{ ruleName: "minNumber", attemptedValue: 15, errorMessage: "Age must be at least 18" }]
 *   }
 * }
 * ```
 */
export interface FieldErrorOf<T, K extends keyof T = keyof T> {
    isValid: boolean;
    fieldName: K;
    errors?: T extends object ? FieldErrors<T, K> : RuleViolation[];
}
