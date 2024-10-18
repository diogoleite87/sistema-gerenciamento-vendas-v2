import { useEffect, useState } from "react";

import DeleteOrder from "../DeleteOrder";

import { Order } from "../../schemas/models";
import {
    Box, Button, Grid, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow, Typography,
} from "@mui/material";
import { orderService } from "../../services/orderService";
import { base64ToImage } from "../../utils/convertImage";
import { DialogOrderProps } from "../OrderContainer";
import { toast } from "react-toastify";


interface IOrderProps {
    id: number,
    deleteSucess(): void
}

export default function OrderById({ id, deleteSucess }: IOrderProps) {

    const [order, setOrder] = useState<Order>()

    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [page, setPage] = useState<number>(0)

    const [deleteOrder, setDeleteOrder] = useState<DialogOrderProps>({
        openDialog: false,
        order: undefined
    })

    const getOrder = () => {

        orderService.getOrderById(id).then(res => {
            setOrder(res.data)
        }).catch(err => {
            toast.error(err.message)
        })
    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteOrder = () => {
        setDeleteOrder({
            openDialog: true,
            order
        })
    };

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <Grid container spacing={3}>
            <DeleteOrder deleteOrder={deleteOrder} setDeleteOrder={setDeleteOrder} handleDeleteSucess={deleteSucess} />
            <Grid item xs={5}>
                <Box>
                    <Typography variant="body1"><strong>Valor: R$</strong> {order?.value || 'N/A'}</Typography>
                    <Typography variant="body1"><strong>Nome do Vendedor: </strong> {order?.vendor.name || 'N/A'}</Typography>

                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box>
                    <Box>
                        <Typography variant="body1"><strong>Nome do Cliente: </strong> {order?.client.name || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>CPF: </strong> {order?.client.cpf || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>Email: </strong> {order?.client.email || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>Endereço: </strong> {order?.client.address || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>Celular: </strong> {order?.client.phone || 'N/A'}</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={1}>
                <Box display="flex" alignContent="center" alignItems="center">
                    <Button color="error" variant="contained" fullWidth onClick={handleDeleteOrder}>
                        Apagar
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    <strong>
                        Itens:
                    </strong>
                </Typography>
                <TableContainer component={Paper} >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Imagem</strong></TableCell>
                                <TableCell align="center"><strong>Nome</strong></TableCell>
                                <TableCell align="center"><strong>Quantidade</strong></TableCell>
                                <TableCell align="center"><strong>Valor Unitário</strong></TableCell>
                                <TableCell align="center"><strong>Valor Total</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order?.items
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={item.id}>
                                            <TableCell align="center">
                                                <Box component='img' borderRadius={3} width={200} height={200} src={base64ToImage(item.item.image ?? '', item.item.name ?? '').src} />
                                            </TableCell>
                                            <TableCell align="center">{item.item.name}</TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="center">R$ {item.value}</TableCell>
                                            <TableCell align="center">R$ {item.value * item.quantity}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={order?.items.length ?? 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>

        </Grid>
    )
}