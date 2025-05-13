import { PropertyRuleFunc, TypeOfArray } from "../types";

/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param propNameToBeSummed The property name whose values will be summed.
 * @param minSum The minimum sum that should be allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
export const minSumOf = <TValue, TObject>(
    propNameToBeSummed: keyof TypeOfArray<TValue[]>,
    minSum: number,
    errorMessage?: string
): PropertyRuleFunc<TValue[], TObject> => {
    const msg = errorMessage ?? `The minimum sum of ${propNameToBeSummed.toString()} is ${minSum}.`;

    const ruleFunc: PropertyRuleFunc<TValue[], TObject> = (value: TValue[]) => {
        if (!Array.isArray(value)) {
            console.warn("minSumOf: value is not an array.");
            return { isValid: false, errorMessage: msg };
        }

        const total = value.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed];
            const typeofValue = typeof propValue;
            const isNumber = typeofValue === "bigint" || typeofValue === "number";

            if (!isNumber || propValue == null || isNaN(Number(propValue))) {
                console.warn(`minSumOf: Invalid value '${propValue}'. Must be a number.`);
                return accumulator;
            }

            return accumulator + Number(propValue);
        }, 0);

        return total >= minSum
            ? { isValid: true, errorMessage: msg }
            : { isValid: false, errorMessage: msg };
    };

    return ruleFunc;
};
