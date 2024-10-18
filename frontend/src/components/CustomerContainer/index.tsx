import { useEffect, useState } from "react"

import CircularProgressLoading from "../CircularProgressLoading"
import UpdateCustomer from "../UpdateCustomer"
import DeleteCustomer from "../DeleteCustomer"
import CreateCustomer from "../CreateCustomer"

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { customerService } from "../../services/customerService"
import { Customer } from "../../schemas/models"
import { toast } from "react-toastify"

export type DialogCustomerProps = {
    openDialog: boolean,
    customer: Customer | undefined
}

export default function CustomerContainer() {

    const [filterCustomer, setFilterCustomer] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [page, setPage] = useState<number>(0)

    const [createCustomer, setCreateCustomer] = useState<boolean>(false)
    const [updateCustomer, setUpdateCustomer] = useState<DialogCustomerProps>({
        openDialog: false,
        customer: undefined
    })

    const [deleteCustomer, setDeleteCustomer] = useState<DialogCustomerProps>({
        openDialog: false,
        customer: undefined
    })

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

    const handleCreateCustomer = () => {
        setCreateCustomer(true)
    };

    const handleUpdateCustomer = (customer: Customer) => {
        setUpdateCustomer({
            openDialog: true,
            customer
        })
    };

    const handleDeleteCustomer = (customer: Customer) => {
        setDeleteCustomer({
            openDialog: true,
            customer
        })
    };

    useEffect(() => {
        getAllCustomers()
    }, [])

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <CreateCustomer getCustomers={getAllCustomers} openDialog={createCustomer} setOpenDialog={setCreateCustomer} />
            <DeleteCustomer deleteCustomer={deleteCustomer} getCustomers={getAllCustomers} setDeleteCustomer={setDeleteCustomer} />
            <UpdateCustomer getCustomers={getAllCustomers} setUpdateCustomer={setUpdateCustomer} updateCustomer={updateCustomer} />
            {
                loading ?
                    <CircularProgressLoading /> :
                    <Box>
                        <Box mb={4} mt={4} display='flex' justifyContent='center' >
                            <TextField variant="outlined" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                            <Button variant="contained" sx={{ ml: 1 }} disabled={loading} size="small" onClick={handleCreateCustomer}>
                                Cadastrar
                            </Button>
                        </Box>
                        <TableContainer component={Paper} >
                            <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Nome</strong></TableCell>
                                        <TableCell align="center"><strong>E-mail</strong></TableCell>
                                        <TableCell align="center"><strong>CPF</strong></TableCell>
                                        <TableCell align="center"><strong>Celular</strong></TableCell>
                                        <TableCell align="center"><strong>Endereço</strong></TableCell>
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
                                                    <TableCell align="center">{customer.phone}</TableCell>
                                                    <TableCell align="center">{customer.address}</TableCell>
                                                    <TableCell align="center">
                                                        <Button size="small" color="warning" onClick={() => handleUpdateCustomer(customer)}>
                                                            Editar
                                                        </Button>
                                                        <Button size="small" color="error" onClick={() => handleDeleteCustomer(customer)}>
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
                                count={customers.filter(person => person.name.toLowerCase().includes(filterCustomer.toLowerCase())).length}
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