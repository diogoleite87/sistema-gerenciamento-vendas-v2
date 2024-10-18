import jwt from 'jsonwebtoken'

import { UserRepositoryPrisma } from '../repositories/user.repository'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-error'

type JwtPayload = {
    id: string
}

export const authMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {

    const userRepository = new UserRepositoryPrisma();

    const { authorization } = req.headers

    if (!authorization) {
        throw new UnauthorizedError('Não autorizado.')
    }

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepository.findUserById(id);

    if (!user) {
        throw new UnauthorizedError('Não autorizado.')
    }

    const { password: _, ...loggedUser } = user

    req.user = loggedUser

    next()
}
