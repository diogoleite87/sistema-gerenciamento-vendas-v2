import { User } from "@prisma/client";

export interface UserDTO {
    email: string,
    password: string,
    name: string,
    description: string
}

export interface UserLoginDTO {
    email: string,
    password: string
}

export interface UserWithoutPassword {
    id: string,
    type: number,
    name: string,
    email: string,
    description: string | null
}

export interface AuthData {
    user_token: string,
    user: UserWithoutPassword
}

export interface UserRepository {
    searchUser(user: UserLoginDTO): Promise<User | null>
    createUser(user: UserDTO): Promise<UserWithoutPassword>
    findAllUsers(): Promise<UserWithoutPassword[] | []>
    findUserById(id: string): Promise<User | null>
    updateUserById(id: string, user: UserDTO): Promise<UserWithoutPassword | null>
    findUserByEmail(email: string): Promise<User | null>
    deleteUserById(id: string): Promise<UserWithoutPassword | null>
}