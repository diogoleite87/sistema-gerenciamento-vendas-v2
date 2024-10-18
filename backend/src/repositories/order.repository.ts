import { OrderAndOrderItemResponse, OrderAndOrderItemSummaryResponse, OrderDTO, OrderItemResponse, OrderRepository } from "../interfaces/order.interface";
import { prisma } from "../database/prisma-client";

class OrderRepositoryPrisma implements OrderRepository {

    async createOrder(order: OrderDTO): Promise<OrderAndOrderItemResponse> {
        return prisma.$transaction(async (prisma) => {
            const { items, ...orderDetails } = order;

            const itemsAux = await Promise.all(
                items.map(async (item) => {
                    const itemData = await prisma.item.update({
                        where: {
                            id: item.id,
                        },
                        data: {
                            stock: {
                                decrement: item.quantity
                            }
                        }
                    });

                    return itemData;
                })
            );

            const totalValue = itemsAux.reduce((accumulator, itemAux) => {
                const item = items.find((item) => item.id === itemAux.id);

                if (item) {
                    accumulator += itemAux.value * (item.quantity || 1);
                }

                return accumulator;
            }, 0);

            const resultOrder = await prisma.order.create({
                data: {
                    clientId: orderDetails.clientId,
                    vendorId: orderDetails.vendorId,
                    deleted: false,
                    value: totalValue,
                },
                select: {
                    id: true,
                    value: true,
                    updatedAt: true,
                    createdAt: true,
                    vendor: {
                        select: {
                            id: true,
                            type: true,
                            name: true,
                            deleted: true,
                            email: true,
                            description: true,
                        },
                    },
                    client: {
                        select: {
                            id: true,
                            cpf: true,
                            name: true,
                            deleted: true,
                            email: true,
                        },
                    },
                },
            });

            const resultOrderItem: OrderItemResponse[] = await Promise.all(
                items.map(async (item) => {
                    const result = await prisma.orderItem.create({
                        data: {
                            deleted: false,
                            quantity: item.quantity,
                            orderId: resultOrder.id,
                            itemId: item.id,
                            value:
                                itemsAux.find((itemAux) => item.id === itemAux.id)?.value || 0,
                        },
                        select: {
                            id: true,
                            quantity: true,
                            value: true,
                            item: {
                                select: {
                                    image: true,
                                    name: true,
                                    deleted: true,
                                    category: {
                                        select: {
                                            id: true,
                                            name: true,
                                            description: true,
                                            deleted: true,
                                        },
                                    },
                                },
                            },
                        },
                    });
                    return result;
                })
            );

            return {
                ...resultOrder,
                items: resultOrderItem,
            };
        });
    }


    async findOrderById(id: number): Promise<OrderAndOrderItemResponse | null> {

        const result = await prisma.order.findUnique({
            where: {
                id,
                deleted: false
            },
            select: {
                id: true,
                value: true,
                updatedAt: true,
                createdAt: true,
                vendor: {
                    select: {
                        id: true,
                        type: true,
                        name: true,
                        deleted: true,
                        email: true,
                        description: true
                    }
                },
                client: {
                    select: {
                        id: true,
                        cpf: true,
                        name: true,
                        deleted: true,
                        email: true
                    }
                },
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        value: true,
                        item: {
                            select: {
                                id: true,
                                image: true,
                                name: true,
                                deleted: true,
                                category: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true,
                                        deleted: true
                                    }
                                }
                            }
                        }
                    },
                    where: {
                        deleted: false
                    }
                }
            }
        })

        return result || null;
    }

    async deleteOrderById(id: number): Promise<boolean> {

        const result = await prisma.$transaction([
            prisma.order.update({
                where: { id },
                data: { deleted: true },
            }),
            prisma.orderItem.updateMany({
                where: { orderId: id },
                data: { deleted: true },
            })
        ])

        return result ? true : false;
    }

    async findAllOrders(vendorId?: string, clientId?: number, date?: string): Promise<OrderAndOrderItemSummaryResponse[] | []> {

        const result = await prisma.order.findMany({
            where: {
                deleted: false,
                clientId: clientId ? clientId : undefined
            },
            select: {
                id: true,
                value: true,
                updatedAt: true,
                createdAt: true,
                vendor: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                client: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        value: true,
                        item: {
                            select: {
                                id: true,
                                name: true,
                                category: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                    where: {
                        deleted: false
                    }
                }
            }
        })

        return result;
    }

}

export { OrderRepositoryPrisma }