"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("ValidatorFunc Test", () => {
    it("Should compile", () => {
        const validateFunc = function (value, objRef) {
            return true;
        };
        expect(validateFunc).not.toBeNull();
    });
});
