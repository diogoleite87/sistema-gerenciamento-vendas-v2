import { Category, Customer, Order, OrderItem } from "@prisma/client";
import { UserWithoutPassword } from "./user.interface";

export interface OrderDTO {
    clientId: number;
    vendorId: string;
    items: {
        quantity: number,
        id: number
    }[];
}

export interface CategoryOrderResponse {
    id: number,
    name: string,
    description: string | null,
    deleted: boolean
}

export interface OrderItemResponse {
    id: number;
    quantity: number;
    value: number;
    item: {
        image: string | null;
        name: string;
        category: CategoryOrderResponse;
        deleted: boolean;
    };
}

export interface CustomerOrderResponse {
    id: number;
    cpf: string;
    name: string;
    deleted: boolean;
    email: string | null;
}

export interface OrderAndOrderItemResponse {
    id: number;
    client: CustomerOrderResponse;
    vendor: UserWithoutPassword;
    value: number;
    items: OrderItemResponse[]
}

export interface OrderAndOrderItemSummaryResponse {
    id: number,
    value: number,
    updatedAt: Date,
    createdAt: Date,
    vendor: {
        id: string,
        name: string
    },
    client: {
        id: number,
        name: string
    },
    items: {
        id: number,
        quantity: number,
        value: number,
        item: {
            id: number,
            name: string,
            category: {
                id: number,
                name: string
            }
        }
    }[]
}

export interface OrderRepository {
    findOrderById(id: number): Promise<OrderAndOrderItemResponse | null>
    deleteOrderById(id: number): Promise<boolean>
    findAllOrders(vendorId?: string, clientId?: number, date?: string): Promise<OrderAndOrderItemSummaryResponse[] | []>
    createOrder(order: OrderDTO): Promise<OrderAndOrderItemResponse>
}