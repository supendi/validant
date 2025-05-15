import { createUserRepository, User } from "./services/repositories/userRepository";
import { createLoginValidationService } from "./services/validations/loginValidationService";
import { createProductValidationService } from "./services/validations/productValidationService";
import { createRegistrationValidationService } from "./services/validations/registrationValidationService";

export function createEcommerceContext(userDatabase: User[]) {
    const userRepository = createUserRepository(userDatabase);
    const registrationValidationService = createRegistrationValidationService(userRepository);
    const loginValidationService = createLoginValidationService(userRepository);
    const productValidationService = createProductValidationService(userRepository)
    return {
        userRepository,
        registrationValidationService,
        loginValidationService,
        productValidationService
    };
}
