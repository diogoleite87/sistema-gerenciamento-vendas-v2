import { useEffect, useState } from "react"

import CircularProgressLoading from "../CircularProgressLoading"
import CreateUser from "../CreateUser"

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { userService } from "../../services/userService"
import { User } from "../../schemas/models"
import { toast } from "react-toastify"
import UpdateUser from "../UpdateUser"
import DeleteUser from "../DeleteUser"

export type DialogUserProps = {
    openDialog: boolean,
    user: User | undefined
}

export default function UserContainer() {

    const [filterPerson, setFilterPerson] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const [page, setPage] = useState<number>(0)

    const [createUser, setCreateUser] = useState<boolean>(false)
    const [updateUser, setUpdateUser] = useState<DialogUserProps>({
        openDialog: false,
        user: undefined
    })

    const [deleteUser, setDeleteUser] = useState<DialogUserProps>({
        openDialog: false,
        user: undefined
    })

    const getAllUsers = () => {

        setLoading(true)

        userService.getAllUsers().then(res => {
            setUsers(res.data)
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
        setFilterPerson(event.target.value);
        setPage(0);
    };

    const handleCreateUser = () => {
        setCreateUser(true)
    };

    const handleUpdateUser = (user: User) => {
        setUpdateUser({
            openDialog: true,
            user
        })
    };

    const handleDeleteUser = (user: User) => {
        setDeleteUser({
            openDialog: true,
            user
        })
    };

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <CreateUser setOpenDialog={setCreateUser} openDialog={createUser} getUsers={getAllUsers} />
            <UpdateUser setUpdateUser={setUpdateUser} getUsers={getAllUsers} updateUser={updateUser} />
            <DeleteUser deleteUser={deleteUser} getUsers={getAllUsers} setDeleteUser={setDeleteUser} />
            {
                loading ?
                    <CircularProgressLoading /> :
                    <Box>
                        <Box mb={4} mt={4} display='flex' justifyContent='center' >
                            <TextField variant="outlined" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                            <Button variant="contained" sx={{ ml: 1 }} disabled={loading} size="small" onClick={handleCreateUser}>
                                Cadastrar
                            </Button>
                        </Box>
                        <TableContainer component={Paper} >
                            <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Nome</strong></TableCell>
                                        <TableCell align="center"><strong>E-mail</strong></TableCell>
                                        <TableCell align="center"><strong>Tipo</strong></TableCell>
                                        <TableCell align="center"><strong>Descrição</strong></TableCell>
                                        <TableCell align="center"><strong>Ações</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users
                                        .filter(user => user.name.toLowerCase().includes(filterPerson.toLowerCase()))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((user) => {
                                            return (
                                                <TableRow hover tabIndex={-1} key={user.id}>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell align="center">{user.email}</TableCell>
                                                    <TableCell align="center">{user.type == 1 ? 'Administrador' : 'Comum'}</TableCell>
                                                    <TableCell align="center">{user.description}</TableCell>
                                                    <TableCell align="center">
                                                        <Button size="small" color="warning" onClick={() => handleUpdateUser(user)}>
                                                            Editar
                                                        </Button>
                                                        <Button size="small" color="error" onClick={() => handleDeleteUser(user)}>
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
                                count={users.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase())).length}
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