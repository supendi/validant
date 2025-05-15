import { UserRepository } from "./userRepository"

export type ProductPrice = {
    level: number
    price: number
}

export interface Product {
    id: number
    name: string
    prices: ProductPrice[]
    createdByUserEmail: string
    createdDate: Date
}

export interface ProductRequest {
    productName: string
    prices: ProductPrice[]
    userEmail: string
}

export interface ProductRepository { getProductByIdAsync: (productId: number) => Promise<Product | undefined>; listProductsAsync: () => Promise<unknown>; addProductAsync: (request: ProductRequest) => Promise<unknown>; updateProductAsync: (product: Product) => Promise<unknown> }

export function createProductRepository(productDatabase: Product[], userRepository: UserRepository): ProductRepository {

    function getProductByIdAsync(productId: number): Promise<Product | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const productRecord = productDatabase.find(product => product.id === productId);
                if (productRecord) {
                    resolve(productRecord);
                } else {
                    resolve(undefined);
                }
            }, 100);
        });
    }

    function listProductsAsync() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const products = [...productDatabase]
                if (products) {
                    resolve(products);
                } else {
                    resolve(undefined);
                }
            }, 100);
        });
    }

    function addProductAsync(request: ProductRequest) {
        if (!request) throw new Error("Argument product is null or undefined. It is required.");

        return new Promise((resolve) => {
            setTimeout(async () => {
                const user = await userRepository.getUserAsync(request.userEmail)
                if (!user) throw new Error(`Invalid user email ${request.userEmail} tried to create a product.`)

                const now = new Date()

                // set product id : auto increment scenario
                const newProductId = productDatabase.length + 1

                productDatabase.push({
                    id: newProductId,
                    name: request.productName,
                    prices: request.prices,
                    createdByUserEmail: user.email,
                    createdDate: now,
                });
                resolve(undefined)
            }, 100);
        });
    }

    function updateProductAsync(product: Product) {
        if (!product) throw new Error("Argument product is null or undefined. It is required.");

        return new Promise((resolve) => {
            setTimeout(async () => {
                const existingProduct = await getProductByIdAsync(product.id);
                if (existingProduct) throw new Error(`Product id ${product.id} is not found.`);

                const indexOfProduct = productDatabase.indexOf(existingProduct)
                const isValidIndex = indexOfProduct >= 0
                if (isValidIndex) throw new Error("Error occured while trying to update product: Product index is invalid.")

                productDatabase[indexOfProduct] = product
                resolve(undefined)
            }, 100);
        });
    }

    return {
        getProductByIdAsync,
        listProductsAsync,
        addProductAsync,
        updateProductAsync
    }

}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
