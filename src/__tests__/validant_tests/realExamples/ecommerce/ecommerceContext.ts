import { createOrderRepository, Order } from "./services/repositories/orderRepository";
import { createProductRepository, Product } from "./services/repositories/productRepository";
import { createUserRepository, User } from "./services/repositories/userRepository";
import { createLoginValidationService } from "./services/validations/loginValidationService";
import { createOrderValidationService } from "./services/validations/orderValidationService";
import { createProductValidationService } from "./services/validations/productValidationService";
import { createRegistrationValidationService } from "./services/validations/registrationValidationService";

export function createEcommerceContext(userDatabase: User[], productDatabase: Product[], orderDatabase: Order[]) {
    const userRepository = createUserRepository(userDatabase);
    const productRepository = createProductRepository(productDatabase, userRepository)
    const orderRepository = createOrderRepository(orderDatabase)

    const registrationValidationService = createRegistrationValidationService(userRepository);
    const loginValidationService = createLoginValidationService(userRepository);
    const productValidationService = createProductValidationService(userRepository)
    const orderValidationService = createOrderValidationService(userRepository, productRepository)

    return {
        userRepository,
        productRepository,
        orderRepository,
        registrationValidationService,
        loginValidationService,
        productValidationService,
        orderValidationService
    };
}
