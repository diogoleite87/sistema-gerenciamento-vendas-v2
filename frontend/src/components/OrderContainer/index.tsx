import { useEffect, useState } from "react"

import CircularProgressLoading from "../CircularProgressLoading"
import DeleteOrder from "../DeleteOrder"
import CreateOrder from "../CreateOrder"
import ViewOrder from "../ViewOrder"

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { orderService } from "../../services/orderService"
import { Order } from "../../schemas/models"
import { toast } from "react-toastify"


export type DialogOrderProps = {
    openDialog: boolean,
    order: Order | undefined
}

export default function OrderContainer() {

    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [page, setPage] = useState<number>(0)

    const [viewOrder, setViewOrder] = useState<DialogOrderProps>({
        openDialog: false,
        order: undefined
    })

    const [createOrder, setCreateOrder] = useState<boolean>(false)


    const [deleteOrder, setDeleteOrder] = useState<DialogOrderProps>({
        openDialog: false,
        order: undefined
    })

    const getAllOrders = () => {

        setLoading(true)

        orderService.getAllOrders().then(res => {
            setOrders(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCreateOrder = () => {
        setCreateOrder(true)
    };

    const handleChangeViewOrder = (order: Order) => {
        setViewOrder({
            order,
            openDialog: true
        })
    }


    const handleDeleteOrder = (order: Order) => {
        setDeleteOrder({
            openDialog: true,
            order
        })
    };

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            {createOrder && <CreateOrder getOrders={getAllOrders} openDialog={createOrder} setOpenDialog={setCreateOrder} />}
            <ViewOrder setViewOrder={setViewOrder} viewOrder={viewOrder} getOrders={getAllOrders} />
            <DeleteOrder deleteOrder={deleteOrder} handleDeleteSucess={getAllOrders} setDeleteOrder={setDeleteOrder} />
            {
                loading ?
                    <CircularProgressLoading /> :
                    <Box>
                        <Box mb={4} mt={4} >
                            <Button variant="contained" sx={{ ml: 1 }} disabled={loading} size="small" onClick={handleCreateOrder}>
                                Novo Pedido
                            </Button>
                        </Box>
                        <TableContainer component={Paper} >
                            <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>ID</strong></TableCell>
                                        <TableCell align="center"><strong>Valor</strong></TableCell>
                                        <TableCell align="center"><strong>Cliente</strong></TableCell>
                                        <TableCell align="center"><strong>Vendedor</strong></TableCell>
                                        <TableCell align="center"><strong>Ações</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order) => {
                                            return (
                                                <TableRow hover tabIndex={-1} key={order.id}>
                                                    <TableCell align="center">{order.id}</TableCell>
                                                    <TableCell align="center">R$ {order.value}</TableCell>
                                                    <TableCell align="center">{order.client.name}</TableCell>
                                                    <TableCell align="center">{order.vendor.name}</TableCell>
                                                    <TableCell align="center">
                                                        <Button size="small" color="success" onClick={() => handleChangeViewOrder(order)}>
                                                            Expandir
                                                        </Button>
                                                        <Button size="small" color="error" onClick={() => handleDeleteOrder(order)}>
                                                            Excluir
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
            }
        </Box>
    )
}