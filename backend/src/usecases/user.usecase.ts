import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { AuthData, UserDTO, UserLoginDTO, UserRepository, UserWithoutPassword } from "../interfaces/user.interface";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/api-error";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {

    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    async login(body: UserLoginDTO): Promise<AuthData> {

        const user = await this.userRepository.searchUser(body);

        if (!user) {
            throw new BadRequestError('E-mail ou senha inválidos.')
        }

        const verifyPass = await bcrypt.compare(body.password, user.password);

        if (!verifyPass) {
            throw new BadRequestError('E-mail ou senha inválidos.')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h',
        })

        const { password: _, ...userWithoutPassword } = user;

        return ({
            user_token: token,
            user: userWithoutPassword
        });
    }

    async create(body: UserDTO, userRequest: UserWithoutPassword): Promise<UserWithoutPassword> {

        if (userRequest.type != 1) {
            throw new UnauthorizedError('Voce não possui permissão para adicionar outro usuário.')
        }

        const userExists = await this.userRepository.findUserByEmail(body.email);

        if (userExists) {
            throw new BadRequestError('E-mail já existe.');
        }

        const hashPassword = await bcrypt.hash(body.password, 10);

        const newUser = await this.userRepository.createUser({
            password: hashPassword,
            name: body.name,
            description: body.description,
            email: body.email
        });

        return newUser;
    }

    async getProfile(user: UserWithoutPassword): Promise<UserWithoutPassword> {
        return user;
    }

    async deleteById(id: string, user: UserWithoutPassword): Promise<string> {

        if (user.type != 1) {
            throw new UnauthorizedError('Voce não possui permissão para deletar outro usuário.')
        }

        const userExists = await this.userRepository.findUserById(id);

        if (!userExists) {
            throw new NotFoundError("Usuário não existe.")
        }

        const result = await this.userRepository.deleteUserById(id);

        if (!result) {
            throw new BadRequestError('Erro ao deletar o usuário');
        }

        return "Usuário deletado com sucesso."
    }

    async findAllProfiles(user: UserWithoutPassword): Promise<UserWithoutPassword[] | []> {

        if (user.type != 1) {
            throw new UnauthorizedError('Voce não possui permissão para acessar outros usuários.')
        }

        const result = await this.userRepository.findAllUsers();

        return result;
    }

    async updateById(id: string, body: UserDTO, user: UserWithoutPassword): Promise<UserWithoutPassword> {

        if (user.type != 1) {
            throw new UnauthorizedError('Voce não possui permissão para atualizar outros usuários.')
        }

        const userExists = await this.userRepository.findUserById(id);

        if (!userExists) {
            throw new NotFoundError("Usuário não existe.")
        }

        const userEmailExists = await this.userRepository.findUserByEmail(body.email);

        if (userEmailExists && userEmailExists.id != id) {
            throw new BadRequestError('E-mail já existe.');
        }

        const hashPassword = body.password ? await bcrypt.hash(body.password, 10) : null;

        const result = await this.userRepository.updateUserById(id, hashPassword ? { ...body, password: hashPassword } : body);

        if (!result) {
            throw new BadRequestError('Erro ao atualizar o usuário');
        }


        return result;
    }
}

export { UserUseCase }