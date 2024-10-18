import { authMiddleware } from "../middleware/auth.middleware";
import { ItemUseCase } from "../usecases/item.usecase";
import { Request, Response, Router } from "express";


export default function itemRoutes() {

    const itemUseCase = new ItemUseCase();

    const routes = Router()

    routes.use(authMiddleware)

    routes.get('/', async (req: Request, res: Response) => {

        const result = await itemUseCase.findAll(Number(req.query.categoryId));

        res.send(result);
    });

    routes.delete('/:id', async (req: Request, res: Response) => {

        const result = await itemUseCase.deleteById(Number(req.params.id));

        return res.send(result);
    });

    routes.get('/:id', async (req: Request, res: Response) => {

        const result = await itemUseCase.findById(Number(req.params.id));

        res.send(result);
    });

    routes.post('/', async (req: Request, res: Response) => {

        const result = await itemUseCase.create(req.body);

        res.send(result);
    });

    routes.put('/:id', async (req: Request, res: Response) => {

        const result = await itemUseCase.updateById(Number(req.params.id), req.body);

        res.send(result);
    })

    return routes;
}