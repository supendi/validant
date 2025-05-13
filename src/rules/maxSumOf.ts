import { PropertyRuleFunc, TypeOfArray } from "../types";

/**
 * Specifies the rule of maximum sum of the specified property name of an array.
 * @param propNameToBeSummed The property name whose sum is checked.
 * @param maxSum The maximum allowed sum.
 * @param errorMessage Optional custom error message.
 */
export const maxSumOf = <TValue, TObject>(
    propNameToBeSummed: keyof TypeOfArray<TValue[]>,
    maxSum: number,
    errorMessage?: string
): PropertyRuleFunc<TValue[], TObject> => {
    const msg = errorMessage ?? `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`;

    const ruleFunc: PropertyRuleFunc<TValue[], TObject> = (value: TValue[]) => {
        if (!value || !Array.isArray(value)) {
            return { isValid: false, errorMessage: msg };
        }

        const total = value.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed as unknown as keyof TValue];
            const isNumber = typeof propValue === "number" || typeof propValue === "bigint";

            if (!propValue || !isNumber) return accumulator;

            const parsedNumber = parseFloat(String(propValue));
            if (isNaN(parsedNumber)) {
                console.warn(`maxSumOf: value is NaN. The value was '${propValue}'`);
                return accumulator;
            }

            return accumulator + parsedNumber;
        }, 0);

        return total <= maxSum
            ? { isValid: true, errorMessage: msg }
            : { isValid: false, errorMessage: msg };
    };

    return ruleFunc;
};
