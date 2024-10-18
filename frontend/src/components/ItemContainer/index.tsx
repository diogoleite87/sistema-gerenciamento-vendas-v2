import { useEffect, useState } from "react"

import CircularProgressLoading from "../CircularProgressLoading"
import SelectCategory from "../SelectCategory"
import DeleteItem from "../DeleteItem"
import CreateItem from "../CreateItem"
import UpdateItem from "../UpdateItem"

import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { categoryService } from "../../services/categoryService"
import { itemService } from "../../services/itemService"
import { Category, Item } from "../../schemas/models"
import { base64ToImage } from "../../utils/convertImage"
import { toast } from "react-toastify"


export type DialogItemProps = {
    openDialog: boolean,
    item?: Item
}

export type SelectCategoryProps = {
    loading: boolean,
    categories?: Category[]
}

export default function ItemContainer() {

    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [categories, setCategories] = useState<SelectCategoryProps>()
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [filterItem, setFilterItem] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [items, setItems] = useState<Item[]>([])
    const [page, setPage] = useState<number>(0)


    const [createItem, setCreateItem] = useState<boolean>(false)
    const [updateItem, setUpdateItem] = useState<DialogItemProps>({
        openDialog: false,
        item: undefined
    })

    const [deleteItem, setDeleteItem] = useState<DialogItemProps>({
        openDialog: false,
        item: undefined
    })

    const getAllItems = () => {

        setLoading(true)

        itemService.getAllItems(selectedCategory?.id).then(res => {
            setItems(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getAllCategories = () => {

        setCategories({
            loading: true,
            categories: undefined
        })

        categoryService.getAllCategories().then(res => {
            setCategories({
                categories: res.data,
                loading: true
            })
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setCategories(prev => ({
                ...prev,
                loading: false
            }));
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
        setFilterItem(event.target.value);
        setPage(0);
    };

    const handleCreateItem = () => {
        setCreateItem(true)
    };

    const handleUpdateItem = (item: Item) => {
        setUpdateItem({
            openDialog: true,
            item
        })
    };

    const handleDeleteItem = (item: Item) => {
        setDeleteItem({
            openDialog: true,
            item
        })
    };

    useEffect(() => {
        getAllItems()
        getAllCategories()
    }, [selectedCategory])

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <DeleteItem deleteItem={deleteItem} getItems={getAllItems} setDeleteItem={setDeleteItem} />
            <CreateItem getItems={getAllItems} openDialog={createItem} setOpenDialog={setCreateItem} categories={categories} />
            {updateItem.openDialog && <UpdateItem getItems={getAllItems} setUpdateItem={setUpdateItem} updateItem={updateItem} categories={categories} />}
            {
                loading ?
                    <CircularProgressLoading /> :
                    <Box>
                        <Grid mb={2} mt={4} container spacing={1} >
                            <Grid item xs={6} >
                                <TextField size="small" variant="outlined" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectCategory required={false} size="small" setSelectedCategory={setSelectedCategory} categories={categories} selectedCategory={selectedCategory} />
                            </Grid>
                            <Grid item xs={2} component={Box} display='flex' justifyContent='center' alignItems='center'>
                                <Button fullWidth variant="contained" disabled={loading} size="medium" onClick={handleCreateItem}>
                                    Cadastrar
                                </Button>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper} >
                            <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Imagem</strong></TableCell>
                                        <TableCell align="center"><strong>Nome</strong></TableCell>
                                        <TableCell align="center"><strong>Descriçao</strong></TableCell>
                                        <TableCell align="center"><strong>Valor</strong></TableCell>
                                        <TableCell align="center"><strong>Estoque</strong></TableCell>
                                        <TableCell align="center"><strong>Categoria</strong></TableCell>
                                        <TableCell align="center"><strong>Ações</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items
                                        .filter(item => item.name.toLowerCase().includes(filterItem.toLowerCase()))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item) => {
                                            return (
                                                <TableRow hover tabIndex={-1} key={item.id}>
                                                    <TableCell align="center">
                                                        <Box component='img' borderRadius={3} width={200} height={200} src={base64ToImage(item.image, item.name).src} />
                                                    </TableCell>
                                                    <TableCell align="center">{item.name}</TableCell>
                                                    <TableCell align="center">{item.description}</TableCell>
                                                    <TableCell align="center">R$ {item.value}</TableCell>
                                                    <TableCell align="center">{item.stock}</TableCell>
                                                    <TableCell align="center">{item.category.name}</TableCell>
                                                    <TableCell align="center">
                                                        <Button size="small" color="warning" onClick={() => handleUpdateItem(item)}>
                                                            Editar
                                                        </Button>
                                                        <Button size="small" color="error" onClick={() => handleDeleteItem(item)}>
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
                                count={items.filter(person => person.name.toLowerCase().includes(filterItem.toLowerCase())).length}
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