import { UserDTO, UserLoginDTO, UserRepository, UserWithoutPassword } from "../interfaces/user.interface";
import { prisma } from "../database/prisma-client";
import { User } from "@prisma/client";

class UserRepositoryPrisma implements UserRepository {

    async searchUser(user: UserLoginDTO): Promise<User | null> {

        const result = await prisma.user.findFirst({
            where: {
                email: user.email,
                AND: {
                    deleted: false
                }
            }
        });

        return result || null;
    }

    async createUser(user: UserDTO): Promise<UserWithoutPassword> {

        const result = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
                description: user.description,
                type: 2,
                deleted: false
            }
        })

        const { id, description, email, name, type } = result;

        return { id, description, email, name, type };
    }

    async findUserById(id: string): Promise<User | null> {

        const result = await prisma.user.findUnique({
            where: {
                id,
                AND: {
                    deleted: false
                }
            }
        });

        return result || null;
    }

    async findUserByEmail(email: string): Promise<User | null> {

        const result = await prisma.user.findFirst({
            where: {
                email,
                AND: {
                    deleted: false
                }
            }
        });

        return result || null;
    }

    async deleteUserById(id: string): Promise<UserWithoutPassword | null> {

        const result = await prisma.user.update({
            data: {
                deleted: true
            },
            where: {
                id
            }
        })

        return result || null;
    }

    async findAllUsers(): Promise<UserWithoutPassword[] | []> {

        const result = await prisma.user.findMany({
            select: {
                id: true,
                deleted: true,
                email: true,
                name: true,
                description: true,
                type: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deleted: false
            }
        })

        return result
    }

    async updateUserById(id: string, user: UserDTO): Promise<UserWithoutPassword | null> {

        const result = await prisma.user.update({
            select: {
                id: true,
                deleted: true,
                email: true,
                name: true,
                description: true,
                type: true
            },
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
                description: user.description
            },
            where: {
                id
            }
        })

        return result || null;
    }


}

export { UserRepositoryPrisma }