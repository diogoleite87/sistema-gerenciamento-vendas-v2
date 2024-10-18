import { CustomerDTO, CustomerRepository } from "../interfaces/customer.interface";
import { prisma } from "../database/prisma-client";
import { Customer } from "@prisma/client";

class CustomerRepositoryPrisma implements CustomerRepository {

    async createCustomer(customer: CustomerDTO): Promise<Customer> {

        const result = await prisma.customer.create({
            data: {
                cpf: customer.cpf,
                address: customer.address,
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                deleted: false
            }
        });

        return result || null;
    }

    async deleteCustomerById(id: number): Promise<Customer | null> {

        const result = await prisma.customer.update({
            where: {
                id
            },
            data: {
                deleted: true
            }
        });

        return result || null;
    }

    async findAllCustomers(): Promise<Customer[] | []> {

        const result = await prisma.customer.findMany({
            where: {
                deleted: false
            }
        });

        return result;
    }

    async findCustomerByCpf(cpf: string): Promise<Customer | null> {

        const result = await prisma.customer.findFirst({
            where: {
                cpf,
                AND: {
                    deleted: false
                }
            }
        });

        return result || null;
    }

    async findCustomerById(id: number): Promise<Customer | null> {
        const result = await prisma.customer.findUnique({
            where: {
                id,
                AND: {
                    deleted: false
                }
            }
        });

        return result || null;
    }

    async updateCustomerById(id: number, customer: CustomerDTO): Promise<Customer | null> {

        const result = await prisma.customer.update({
            where: {
                id
            },
            data: {
                name: customer.name,
                address: customer.address,
                email: customer.email,
                phone: customer.phone,
            }
        })

        return result || null;
    }
}

export { CustomerRepositoryPrisma }