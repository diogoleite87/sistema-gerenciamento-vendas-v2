import { useEffect, useState } from "react"

import SelectItems, { InsertItem } from "../SelectItems";
import InsertItemOrder from "../InsertItemOrder";
import SelectCustomer from "../SelectCustomer";
import DialogComponent from "../Dialog";

import {
    Box, Button, DialogContent, Divider, Grid, Paper, Stack, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow,
    TextField
} from "@mui/material";
import { categoryService } from "../../services/categoryService";
import { orderService } from "../../services/orderService";
import { base64ToImage } from "../../utils/convertImage";
import { itemService } from "../../services/itemService";
import { SelectCategoryProps } from "../ItemContainer";
import { Category, Customer, Item } from "../../schemas/models";
import { useAuth } from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

interface ICreateOrderProps {
    openDialog: boolean,
    setOpenDialog(state: boolean): void,
    getOrders(): void
}

export type CategoryProps = {
    loading: boolean,
    category?: Category
}

export type SelectItemDialogProps = {
    loading: boolean,
    items: Item[]
}

export type SelectedItems = {
    item: Item,
    itemQuery: {
        id: number,
        quantity: number
    }
}

export type SelectCustomerDialogProps = {
    openDialog: boolean,
    customer?: Customer
}

export default function CreateOrder({ openDialog, setOpenDialog, getOrders }: ICreateOrderProps) {

    const [openSelectItemsDilaog, setOpenSelectItemsDialog] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<SelectedItems[]>([])
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [filterItem, setFilterItem] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    const { authData } = useAuth()

    const [insertItem, setInsertItem] = useState<InsertItem>({
        openDialog: false,
        item: undefined
    })
    const [categories, setCategories] = useState<SelectCategoryProps>({
        categories: undefined,
        loading: false
    })
    const [items, setItems] = useState<SelectItemDialogProps>({
        items: [],
        loading: false
    });

    const [selectCustomer, setSelectCustomer] = useState<SelectCustomerDialogProps>({
        openDialog: false,
        customer: undefined
    })

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const getItems = () => {

        setItems({
            loading: true,
            items: []
        })

        itemService.getAllItems(selectedCategory?.id).then(res => {
            setItems({
                loading: true,
                items: res.data
            })
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setItems(prev => ({
                ...prev,
                loading: false
            }))
        })
    }

    const getCategories = () => {

        setCategories({
            loading: true,
            categories: undefined
        })

        categoryService.getAllCategories().then(res => {
            setCategories({
                categories: res.data,
                loading: true
            })
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setCategories(prev => ({
                ...prev,
                loading: false
            }))
        })
    }

    const handleCreateOrder = () => {

        setLoading(true)

        const items = selectedItems.map((selectedItem) => selectedItem.itemQuery)

        orderService.postOrder({
            vendorId: authData?.user.id ?? '',
            clientId: selectCustomer.customer?.id ?? 0,
            items
        }).then(() => {
            toast.success('Pedido criado com sucesso.')
            handleCloseDialog()
            getOrders()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleEditInsertItem = (item: Item) => {

        setInsertItem({
            openDialog: true,
            item
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

    const handleSelectItem = () => {
        setOpenSelectItemsDialog(true)
    }

    const handleSelectCustomer = () => {
        setSelectCustomer((prev) => ({
            ...prev,
            openDialog: true
        }))
    }

    useEffect(() => {
        getCategories()
        getItems()
    }, [])

    return (
        openDialog &&
        <DialogComponent title="Criar Pedido" maxWidth="lg" fullWidth handleCloseDialog={handleCloseDialog}>
            {insertItem.openDialog && <InsertItemOrder insertItem={insertItem} setSelectedItems={setSelectedItems} selectedItems={selectedItems} setInsertItem={setInsertItem} />}
            {selectCustomer.openDialog && <SelectCustomer selectCustomer={selectCustomer} setSelectCustomer={setSelectCustomer} />}
            <SelectItems openDialog={openSelectItemsDilaog} items={items.items} setOpenDialog={setOpenSelectItemsDialog}
                categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                selectedItems={selectedItems} setSelectedItems={setSelectedItems}
            />
            <DialogContent>
                <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                    <Grid mb={2} mt={4} container spacing={1} >
                        <Grid item xs={12} >
                            <TextField size="small" variant="outlined" fullWidth label='Adicionar Cliente' value={selectCustomer.customer?.name} InputProps={{ readOnly: true }} onClick={handleSelectCustomer} />
                        </Grid>
                        <Grid item xs={10} >
                            <TextField size="small" variant="outlined" fullWidth label='Pesquisar Produto Adicionado' onChange={handleFilter} />
                        </Grid>
                        <Grid item xs={2} component={Box} display='flex' justifyContent='center' alignItems='center'>
                            <Button fullWidth variant="contained" size="medium" onClick={handleSelectItem}>
                                Adicionar
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} >
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><strong>Imagem</strong></TableCell>
                                    <TableCell align="center"><strong>Nome</strong></TableCell>
                                    <TableCell align="center"><strong>Quantidade</strong></TableCell>
                                    <TableCell align="center"><strong>Valor Unitário</strong></TableCell>
                                    <TableCell align="center"><strong>Valor Total</strong></TableCell>
                                    <TableCell align="center"><strong>Ações</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedItems
                                    .filter(item => item.item.name.toLowerCase().includes(filterItem.toLowerCase()))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((selectItem) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={selectItem.item.id}>
                                                <TableCell align="center">
                                                    <Box component='img' borderRadius={3} width={200} height={200} src={base64ToImage(selectItem.item.image, selectItem.item.name).src} />
                                                </TableCell>
                                                <TableCell align="center">{selectItem.item.name}</TableCell>
                                                <TableCell align="center">{selectItem.itemQuery.quantity}</TableCell>
                                                <TableCell align="center">R$ {selectItem.item.value}</TableCell>
                                                <TableCell align="center">R$ {selectItem.item.value * selectItem.itemQuery.quantity}</TableCell>
                                                <TableCell align="center">
                                                    <Button disabled={loading} size="small" color="warning" onClick={() => handleEditInsertItem(selectItem.item)}>
                                                        Editar
                                                    </Button>
                                                    <Button disabled={loading} size="small" color="error">
                                                        Remover
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
                            count={selectedItems.filter(selectItem => selectItem.item.name.toLowerCase().includes(filterItem.toLowerCase())).length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Box>
            </DialogContent>
            <Box width='100%'>
                <Divider />
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                    <LoadingButton loading={items.loading || categories.loading || loading} variant="contained" color="primary" type='submit' onClick={handleCreateOrder}>Confirmar</LoadingButton>
                </Stack>
            </Box>
        </DialogComponent>
    )
}