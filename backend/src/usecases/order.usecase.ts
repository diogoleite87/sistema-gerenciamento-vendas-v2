import { OrderAndOrderItemResponse, OrderAndOrderItemSummaryResponse, OrderDTO, OrderRepository } from "../interfaces/order.interface";
import { CustomerRepositoryPrisma } from "../repositories/customer.repository";
import { OrderRepositoryPrisma } from "../repositories/order.repository";
import { ItemRepositoryPrisma } from "../repositories/item.repository";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { CustomerRepository } from "../interfaces/customer.interface";
import { ItemRepository } from "../interfaces/item.interface";

class OrderUseCase {

    private customerRepository: CustomerRepository;
    private orderRepository: OrderRepository;
    private itemRepository: ItemRepository;
    constructor() {
        this.customerRepository = new CustomerRepositoryPrisma();
        this.orderRepository = new OrderRepositoryPrisma();
        this.itemRepository = new ItemRepositoryPrisma();
    }


    async create(body: OrderDTO): Promise<OrderAndOrderItemResponse> {

        const customerExists = await this.customerRepository.findCustomerById(body.clientId);

        if (!customerExists) {
            throw new NotFoundError('Cliente não existe.');
        }

        for (const item of body.items) {
            const itemExists = await this.itemRepository.findItemById(item.id);

            if (!itemExists) {
                throw new BadRequestError(`Item ${item.id} não existe.`);
            } else if (itemExists.stock - item.quantity < 0) {
                throw new BadRequestError(`Item ${item.id} não possui estoque necessário.`);
            }
        }

        const result = await this.orderRepository.createOrder(body);

        return result;
    }

    async findById(id: number): Promise<OrderAndOrderItemResponse> {

        const result = await this.orderRepository.findOrderById(id);

        if (!result) {
            throw new NotFoundError('Pedido não existe.');
        }

        return result;
    }

    async deleteById(id: number): Promise<string> {

        const orderExists = await this.orderRepository.findOrderById(id);

        if (!orderExists) {
            throw new NotFoundError('Pedido não existe.');
        }

        const result = await this.orderRepository.deleteOrderById(id);

        if (!result) {
            throw new BadRequestError('Erro ao deletar pedido.')
        }

        return "Item deletado com sucesso."
    }

    async findAll(vendorId?: string, clientId?: number, date?: string): Promise<OrderAndOrderItemSummaryResponse[] | []> {

        const result = await this.orderRepository.findAllOrders(vendorId, clientId, date);

        return result;
    }
}

export { OrderUseCase }