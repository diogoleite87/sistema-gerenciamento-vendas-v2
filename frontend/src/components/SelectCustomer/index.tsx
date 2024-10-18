import { useEffect, useState } from "react";

import DialogComponent from "../Dialog";

import { Box, Button, DialogContent, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { customerService } from "../../services/customerService";
import { SelectCustomerDialogProps } from "../CreateOrder";
import { Customer } from "../../schemas/models";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

interface ISelectCustomerProps {
    selectCustomer: SelectCustomerDialogProps,
    setSelectCustomer(state: SelectCustomerDialogProps): void
}

export default function SelectCustomer({ selectCustomer, setSelectCustomer }: ISelectCustomerProps) {

    const [filterCustomer, setFilterCustomer] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)

    const handleCloseDialog = () => {
        setSelectCustomer({
            openDialog: false,
            customer: selectCustomer.customer
        })
    }

    const getAllCustomers = () => {

        setLoading(true)

        customerService.getAllCustomers().then(res => {
            setCustomers(res.data)
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

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCustomer(event.target.value);
        setPage(0);
    };

    const handleSelectCustomer = (customer: Customer) => {
        setSelectCustomer({
            openDialog: false,
            customer
        })
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    return (
        <DialogComponent title={"Selecionar Cliente"} handleCloseDialog={handleCloseDialog}>
            <DialogContent>
                <Box mb={4} mt={4} display='flex' justifyContent='center' >
                    <TextField variant="outlined" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                </Box>
                <TableContainer component={Paper} >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Nome</strong></TableCell>
                                <TableCell align="center"><strong>E-mail</strong></TableCell>
                                <TableCell align="center"><strong>CPF</strong></TableCell>
                                <TableCell align="center"><strong>Ações</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers
                                .filter(customer => customer.name.toLowerCase().includes(filterCustomer.toLowerCase()))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((customer) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={customer.id}>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell align="center">{customer.email}</TableCell>
                                            <TableCell align="center">{customer.cpf}</TableCell>
                                            <TableCell align="center">
                                                <Button size="small" color="info" onClick={() => handleSelectCustomer(customer)}>
                                                    Atribuir
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
                        count={customers.filter(person => person.name.toLowerCase().includes(filterCustomer.toLowerCase())).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </DialogContent>
            <Box width='100%'>
                <Divider />
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                    <LoadingButton loading={loading} variant="contained" color="primary" type='submit' >Atualizar</LoadingButton>
                </Stack>
            </Box>
        </DialogComponent>
    )
}