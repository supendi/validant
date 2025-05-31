
export function stringifyValue<TValue>(value: TValue): string {
    if (value === undefined) return "undefined";
    if (value === null) return "null";

    if (typeof value === "string") return value;
    if (typeof value === "object") return JSON.stringify(value);
    if ((value as any).toString) {
        return value.toString();
    }
    return `failed to stringify value, type of value was: ${typeof value}.`;
}
