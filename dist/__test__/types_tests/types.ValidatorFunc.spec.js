"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("ValidatorFunc Test", () => {
    it("Should compile", () => {
        const validatorFunc = function (value, objRef) {
            return true;
        };
        expect(validatorFunc).not.toBeNull();
    });
});
