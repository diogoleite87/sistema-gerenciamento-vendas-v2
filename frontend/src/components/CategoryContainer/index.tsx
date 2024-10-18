import { useEffect, useState } from "react"

import CircularProgressLoading from "../CircularProgressLoading"
import UpdateCategory from "../UpdateCategory"
import DeleteCategory from "../DeleteCategory"
import CreateCategory from "../CreateCategory"

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { categoryService } from "../../services/categoryService"
import { Category } from "../../schemas/models"
import { toast } from "react-toastify"

export type DialogCategoryProps = {
    openDialog: boolean,
    category: Category | undefined
}

export default function CategoryContainer() {

    const [filterCategory, setFilterCategory] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)

    const [createCategory, setCreateCategory] = useState<boolean>(false)
    const [updateCategory, setUpdateCategory] = useState<DialogCategoryProps>({
        openDialog: false,
        category: undefined
    })

    const [deleteCategory, setDeleteCategory] = useState<DialogCategoryProps>({
        openDialog: false,
        category: undefined
    })

    const getAllCategories = () => {

        setLoading(true)

        categoryService.getAllCategories().then(res => {
            setCategories(res.data)
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
        setFilterCategory(event.target.value);
        setPage(0);
    };

    const handleCreateCategory = () => {
        setCreateCategory(true)
    };

    const handleUpdateCategory = (category: Category) => {
        setUpdateCategory({
            openDialog: true,
            category
        })
    };

    const handleDeleteCategory = (category: Category) => {
        setDeleteCategory({
            openDialog: true,
            category
        })
    };

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <CreateCategory getCategories={getAllCategories} openDialog={createCategory} setOpenDialog={setCreateCategory} />
            <DeleteCategory deleteCategory={deleteCategory} getCategories={getAllCategories} setDeleteCategory={setDeleteCategory} />
            <UpdateCategory getCategories={getAllCategories} setUpdateCategory={setUpdateCategory} updateCategory={updateCategory} />
            {
                loading ?
                    <CircularProgressLoading /> :
                    <Box>
                        <Box mb={4} mt={4} display='flex' justifyContent='center' >
                            <TextField variant="outlined" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                            <Button variant="contained" sx={{ ml: 1 }} disabled={loading} size="small" onClick={handleCreateCategory}>
                                Cadastrar
                            </Button>
                        </Box>
                        <TableContainer component={Paper} >
                            <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Nome</strong></TableCell>
                                        <TableCell align="center"><strong>Descrição</strong></TableCell>
                                        <TableCell align="center"><strong>Ações</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories
                                        .filter(category => category.name.toLowerCase().includes(filterCategory.toLowerCase()))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((category) => {
                                            return (
                                                <TableRow hover tabIndex={-1} key={category.id}>
                                                    <TableCell align="center">{category.name}</TableCell>
                                                    <TableCell align="center">{category.description}</TableCell>
                                                    <TableCell align="center">
                                                        <Button size="small" color="warning" onClick={() => handleUpdateCategory(category)}>
                                                            Editar
                                                        </Button>
                                                        <Button size="small" color="error" onClick={() => handleDeleteCategory(category)}>
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
                                count={categories.filter(person => person.name.toLowerCase().includes(filterCategory.toLowerCase())).length}
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