import { authMiddleware } from "../middleware/auth.middleware";
import { CategoryUseCase } from "../usecases/category.usecase";
import { Request, Response, Router } from "express";


export default function categoryRoutes() {

    const categoryUseCase = new CategoryUseCase();

    const routes = Router()

    routes.use(authMiddleware)

    routes.get('/', async (req: Request, res: Response) => {

        const result = await categoryUseCase.findAll();

        res.send(result);
    })

    routes.delete('/:id', async (req: Request, res: Response) => {

        const result = await categoryUseCase.deleteById(Number(req.params.id))

        return res.send(result)
    })

    routes.get('/:id', async (req: Request, res: Response) => {

        const result = await categoryUseCase.findById(Number(req.params.id));

        res.send(result);
    })

    routes.post('/', async (req: Request, res: Response) => {

        const result = await categoryUseCase.create(req.body);

        res.send(result);
    })

    routes.put('/:id', async (req: Request, res: Response) => {

        const result = await categoryUseCase.updateById(Number(req.params.id), req.body);

        res.send(result);
    })

    return routes;
}