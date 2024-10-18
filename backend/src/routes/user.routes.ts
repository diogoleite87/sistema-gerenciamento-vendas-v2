import { authMiddleware } from "../middleware/auth.middleware";
import { UserDTO, UserLoginDTO } from "../interfaces/user.interface";
import { UserUseCase } from "../usecases/user.usecase";
import { Request, Response, Router } from 'express';


export default function userRoutes() {

    const userUseCase = new UserUseCase();

    const routes = Router()

    routes.post('/authenticate', async (req: Request<{}, {}, UserLoginDTO>, res: Response) => {
        const result = await userUseCase.login(req.body);

        res.send(result);
    })

    routes.use(authMiddleware)

    routes.post('/', async (req: Request<{}, {}, UserDTO>, res: Response) => {

        const result = await userUseCase.create(req.body, req.user);

        res.send(result);
    })

    routes.get('/', async (req: Request, res: Response) => {

        const result = await userUseCase.getProfile(req.user);

        res.send(result)
    })

    routes.get('/all', async (req: Request, res: Response) => {

        const result = await userUseCase.findAllProfiles(req.user);

        res.send(result)
    })

    routes.delete('/:id', async (req: Request, res: Response) => {

        const result = await userUseCase.deleteById(req.params.id, req.user);

        res.send(result)
    })

    routes.put('/:id', async (req: Request, res: Response) => {

        const result = await userUseCase.updateById(req.params.id, req.body, req.user);

        res.send(result)
    })

    return routes;
}