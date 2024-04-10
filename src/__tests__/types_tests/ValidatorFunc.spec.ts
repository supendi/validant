import { ValidateFunc } from "../../types"

/**
 * Ensure all the code below compiled
 */

describe("ValidatorFunc Test", () => {
    it("Should compile", () => {
        const validateFunc: ValidateFunc<any, any> = function (value: any, objRef?: any) {
            return true
        }

        expect(validateFunc).not.toBeNull()
    })
})
