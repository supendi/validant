/**
 * Note that we mix the types: Order use type, and orderitem use interface
 * To ensure that this kind of scenario works
 */


export type Order = {
    orderNumber: string
    orderDate: Date
    orderName?: string,
    gst: number
    totalAmount: number
    createdByUserEmail: string
    createdAt: Date
    orderItems: OrderItem[]
}

export interface OrderItem {
    orderNumber: string
    productId: number,
    qty: number
    price: number
    amount: number
    discountPercentage?: number
    discountAmount?: number
    subtotal: number
}

export type OrderRequest = {
    orderDate: Date
    orderName?: string,
    gst: number
    totalAmount: number
    orderItems: OrderItemRequest[]
    userEmail: string
}

export interface OrderItemRequest {
    productId: number,
    qty: number
    price: number
    amount: number
    discountPercentage: number
    discountAmount: number
    subtotal: number
}

export function createOrderRepository(orderDatabase: Order[]) {

    function getOrderAsync(orderNumber: string): Promise<Order | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingOrder = orderDatabase.find(order => order.orderNumber === orderNumber);
                if (existingOrder) {
                    resolve(existingOrder);
                } else {
                    resolve(undefined);
                }
            }, 10);
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
            }, 10);
        });
    }

    function addOrderAsync(request: OrderRequest) {
        if (!request) throw new Error("Argument order request is null or undefined. It is required.");

        return new Promise((resolve) => {
            setTimeout(async () => {
                const nextId = orderDatabase.length + 1
                const nextOrderNumber = "ORDER" + nextId

                const existingOrder = await getOrderAsync(nextOrderNumber);
                if (existingOrder) throw new Error(`Duplicate order number ${nextOrderNumber}`);

                const now = new Date()

                const order: Order = {
                    orderNumber: nextOrderNumber,
                    orderDate: request.orderDate,
                    orderName: request.orderName,
                    gst: request.gst,
                    totalAmount: request.totalAmount,
                    orderItems: request.orderItems.map<OrderItem>(x => ({
                        orderNumber: nextOrderNumber,
                        productId: x.productId,
                        price: x.price,
                        qty: x.qty,
                        amount: x.amount,
                        discountAmount: x.discountAmount,
                        discountPercentage: x.discountPercentage,
                        subtotal: x.subtotal,
                    })),
                    createdByUserEmail: request.userEmail,
                    createdAt: now,
                }
                orderDatabase.push(order);
                resolve(undefined)
            }, 10);
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
            }, 10);
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
