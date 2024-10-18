import { authMiddleware } from "../middleware/auth.middleware";
import { OrderUseCase } from "../usecases/order.usecase";
import { Request, Response, Router } from "express";

export default function orderRoutes() {

    const orderUseCase = new OrderUseCase();

    const routes = Router();

    routes.use(authMiddleware)

    routes.post('/', async (req: Request, res: Response) => {

        const result = await orderUseCase.create(req.body);

        res.send(result);
    });

    routes.get('/:id', async (req: Request, res: Response) => {

        const result = await orderUseCase.findById(Number(req.params.id));

        res.send(result);
    });

    routes.delete('/:id', async (req: Request, res: Response) => {

        const result = await orderUseCase.deleteById(Number(req.params.id));

        return res.send(result);
    });

    routes.get('/', async (req: Request, res: Response) => {

        const result = await orderUseCase.findAll(String(req.query.vendorId), Number(req.query.clientId), String(req.query.date));

        res.send(result);
    });

    return routes;
}