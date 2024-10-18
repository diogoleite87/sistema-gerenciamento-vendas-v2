import { Customer } from "@prisma/client";
import { CustomerDTO, CustomerRepository } from "../interfaces/customer.interface";
import { CustomerRepositoryPrisma } from "../repositories/customer.repository";
import { BadRequestError, NotFoundError } from "../helpers/api-error";

class CustomerUseCase {

    private customerRepository: CustomerRepository;
    constructor() {
        this.customerRepository = new CustomerRepositoryPrisma();
    }

    async create(body: CustomerDTO): Promise<Customer> {

        const customerExixtis = await this.customerRepository.findCustomerByCpf(body.cpf);

        if (customerExixtis) {
            throw new BadRequestError('Cliente com CPF já cadastrado.')
        }

        const customer = await this.customerRepository.createCustomer(body);

        return customer;
    }

    async findAll(): Promise<Customer[] | []> {

        const result = await this.customerRepository.findAllCustomers();

        return result;
    }

    async findById(id: number): Promise<Customer> {

        const result = await this.customerRepository.findCustomerById(id);

        if (!result) {
            throw new NotFoundError('Cliente não existe.');
        }

        return result;
    }

    async findByCpf(cpf: string): Promise<Customer> {

        const result = await this.customerRepository.findCustomerByCpf(cpf);

        if (!result) {
            throw new NotFoundError('Cliente não existe.');
        }

        return result;
    }

    async updateById(id: number, body: CustomerDTO): Promise<Customer> {

        const customerExists = await this.customerRepository.findCustomerById(id);

        if (!customerExists) {
            throw new NotFoundError('Cliente não existe.');
        }

        const customerCpfExists = await this.customerRepository.findCustomerByCpf(body.cpf);

        if (customerCpfExists && customerCpfExists.id != id) {
            throw new BadRequestError('Cpf já existe.');
        }

        const result = await this.customerRepository.updateCustomerById(id, body);

        if (!result) {
            throw new BadRequestError('Erro ao atualizar o cliente');
        }

        return result;
    }

    async deleteById(id: number): Promise<string> {

        const customerExists = await this.customerRepository.findCustomerById(id);

        if (!customerExists) {
            throw new NotFoundError('Cliente não existe.');
        }

        const result = await this.customerRepository.deleteCustomerById(id);

        if (!result) {
            throw new BadRequestError('Erro ao deletar cliente.')
        }

        return "Cliente deletado com sucesso."

    }
}

export { CustomerUseCase }