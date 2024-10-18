import { Request, Response, Router } from "express";
import { CustomerUseCase } from "../usecases/customer.usecase";
import { authMiddleware } from "../middleware/auth.middleware";


export default function customerRoutes() {

    const customerUseCase = new CustomerUseCase();

    const routes = Router()

    routes.use(authMiddleware)

    routes.get('/', async (req: Request, res: Response) => {

        const result = await customerUseCase.findAll();

        res.send(result);
    })

    routes.delete('/:id', async (req: Request, res: Response) => {

        const result = await customerUseCase.deleteById(Number(req.params.id));

        return res.send(result);
    });

    routes.get('/:id', async (req: Request, res: Response) => {

        const result = await customerUseCase.findById(Number(req.params.id));

        res.send(result);
    });

    routes.get('/cpf/:cpf', async (req: Request, res: Response) => {

        const result = await customerUseCase.findByCpf(req.params.cpf);

        res.send(result);
    });

    routes.post('/', async (req: Request, res: Response) => {

        const result = await customerUseCase.create(req.body);

        res.send(result);
    });

    routes.put('/:id', async (req: Request, res: Response) => {

        const result = await customerUseCase.updateById(Number(req.params.id), req.body);

        res.send(result);
    })

    return routes;
}