import bcrypt from 'bcrypt'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const userAlreadyExists = await prisma.user.findFirst({
        where: {
            email: process.env.FIRST_USER_EMAIL,
            AND: {
                deleted: false
            }
        }
    })

    if (userAlreadyExists) {
        throw new Error('Usuário já existente.')
    }

    const hashPassword = await bcrypt.hash(process.env.FIRST_USER_PASSWORD ?? '', 10);

    await prisma.user.create({
        data: {
            email: process.env.FIRST_USER_EMAIL ?? '',
            password: hashPassword,
            name: process.env.FIRST_USER_NAME ?? '',
            description: process.env.FIRST_USER_DESCRIPTION,
            type: 1,
            deleted: false
        }
    })

}

main().then(async () => {

    await prisma.$disconnect()

}).catch(async (e) => {

    console.error(e)
    await prisma.$disconnect()
    process.exit(1)

})