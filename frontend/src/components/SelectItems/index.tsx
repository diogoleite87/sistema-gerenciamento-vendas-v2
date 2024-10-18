import { useState } from "react";

import InsertItemOrder from "../InsertItemOrder";
import SelectCategory from "../SelectCategory";
import DialogComponent from "../Dialog";

import {
    Box, Button, DialogContent, Divider, Grid, Paper, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow,
    TextField
} from "@mui/material";
import { base64ToImage } from "../../utils/convertImage";
import { SelectCategoryProps } from "../ItemContainer";
import { Category, Item } from "../../schemas/models";
import { SelectedItems } from "../CreateOrder";

interface ISelectItemsProps {
    openDialog: boolean,
    setOpenDialog(state: boolean): void,
    selectedCategory?: Category,
    setSelectedCategory(state: Category): void,
    categories: SelectCategoryProps,
    items: Item[],
    setSelectedItems(state: SelectedItems[]): void,
    selectedItems: SelectedItems[]
}

export type InsertItem = {
    item?: Item,
    openDialog: boolean,
    quantity?: number
}


export default function SelectItems({ openDialog, setOpenDialog, selectedCategory,
    setSelectedCategory, categories, items, selectedItems, setSelectedItems }: ISelectItemsProps) {

    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [filterItem, setFilterItem] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    const [insertItem, setInsertItem] = useState<InsertItem>({
        item: undefined,
        openDialog: false
    })

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInsertItem = (item: Item) => {
        setInsertItem({
            item,
            openDialog: true
        })
    }

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterItem(event.target.value);
        setPage(0);
    };

    return (
        openDialog &&
        <DialogComponent title="Adicionar Produto" maxWidth="xl" fullWidth handleCloseDialog={handleCloseDialog}>
            {insertItem.openDialog && <InsertItemOrder insertItem={insertItem} setInsertItem={setInsertItem} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />}
            <DialogContent>
                <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                    <Grid mb={2} mt={4} container spacing={1} >
                        <Grid item xs={8} >
                            <TextField size="small" variant="outlined" fullWidth label='Pesquisar' onChange={handleFilter} />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectCategory required={false} size="small" setSelectedCategory={setSelectedCategory} categories={categories} selectedCategory={selectedCategory} />
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} >
                        <Table stickyHeader aria-label="sticky table">
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
                                                    <Button size="small" color="warning" onClick={() => handleInsertItem(item)}>
                                                        Adicionar
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
            </DialogContent>
            <Box width='100%'>
                <Divider />
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                </Stack>
            </Box>
        </DialogComponent>
    )
}