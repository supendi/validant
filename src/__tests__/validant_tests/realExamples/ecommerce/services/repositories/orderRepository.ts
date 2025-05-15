/**
 * Note that we mix the types: Order use type, and orderitem use interface
 * To ensure that this kind of scenario works
 */


export type Order = {
    orderNumber: string
    orderDate: string
    orderName?: string,
    gst: number
    totalAmount: number
    createdByUserId: number
    createdAt: Date
}

export interface OrderItem {
    id: number
    orderNumber: string
    orderId: number
    orderName: string
    qty: number
    price: number
    discountPercentage: number
    discountAmount: number
    amount: number
}

export function createUserRepository(orderDatabase: Order[]) {

    function getOrderAsync(orderNumber: string): Promise<Order | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingOrder = orderDatabase.find(order => order.orderNumber === orderNumber);
                if (existingOrder) {
                    resolve(existingOrder);
                } else {
                    resolve(undefined);
                }
            }, 100);
        });
    }

    function listOrdersAsync() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = [...orderDatabase]
                if (orders) {
                    resolve(orders);
                } else {
                    resolve(undefined);
                }
            }, 100);
        });
    }

    function addOrderAsync(order: Order) {
        if (!order) throw new Error("Argument order is null or undefined. It is required.");

        return new Promise((resolve) => {
            setTimeout(async () => {
                const existingOrder = await getOrderAsync(order.orderNumber);
                if (existingOrder) throw new Error(`Duplicate order number ${order.orderNumber}`);

                orderDatabase.push(order);
                resolve(undefined)
            }, 100);
        });
    }

    function updateOrderAsync(order: Order) {
        if (!order) throw new Error("Argument order is null or undefined. It is required.");

        return new Promise((resolve) => {
            setTimeout(async () => {
                const existingOrder = await getOrderAsync(order.orderNumber);
                if (existingOrder) throw new Error(`Order number ${order.orderNumber} is not found.`);

                const indexOfOrder = orderDatabase.indexOf(existingOrder)
                const isValidIndex = indexOfOrder >= 0
                if (isValidIndex) throw new Error("Error occured while trying to update order: Order index is invalid.")

                orderDatabase[indexOfOrder] = order
                resolve(undefined)
            }, 100);
        });
    }

    return {
        getOrderAsync,
        listOrdersAsync,
        addOrderAsync,
        updateOrderAsync
    }
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
