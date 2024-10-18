import { useEffect, useState } from "react"

import DialogComponent from "../Dialog"

import { Box, Button, DialogContent, Divider, Stack, TextField, Typography } from "@mui/material"
import { SelectedItems } from "../CreateOrder"
import { InsertItem } from "../SelectItems"
import { toast } from "react-toastify"


interface IInsertItemOrderProps {
    insertItem: InsertItem,
    setInsertItem(state: InsertItem): void,
    setSelectedItems(state: SelectedItems[]): void,
    selectedItems: SelectedItems[]
}

export default function InsertItemOrder({ selectedItems, setSelectedItems, insertItem, setInsertItem }: IInsertItemOrderProps) {


    const [itemAlreadyExists, setItemAlreadyExists] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1);

    const insertItemOrder = () => {

        if (quantity <= (insertItem.item?.stock ?? 0)) {
            const existingIndex = selectedItems.findIndex(
                (selectedItem) => selectedItem.itemQuery.id === (insertItem.item ? insertItem.item.id : 0)
            );

            if (existingIndex !== -1) {
                const updatedItems = [...selectedItems];
                updatedItems[existingIndex].itemQuery.quantity = quantity;
                setSelectedItems(updatedItems);
            } else if (insertItem.item) {
                setSelectedItems([...selectedItems, {
                    item: insertItem.item,
                    itemQuery: {
                        id: insertItem.item?.id ?? 0,
                        quantity
                    }
                }]);
            }

            handleCloseDialog()
        } else {
            toast.warning('Estoque indisponível para quantidade solicitada.')
        }

    }

    const verifyItemAlreadyInserted = () => {
        const existingItem = selectedItems.find(
            (selectedItem) => selectedItem.itemQuery.id === (insertItem.item ? insertItem.item.id : 0)
        );


        if (existingItem) {
            setItemAlreadyExists(true)
        }

        setQuantity(existingItem?.itemQuery.quantity ?? 1)
    }

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value))
    }

    const handleCloseDialog = () => {
        setInsertItem({
            openDialog: false,
            item: undefined
        })
    }

    useEffect(() => {
        verifyItemAlreadyInserted()
    }, [])

    return (
        insertItem.openDialog &&
        <DialogComponent title={"Insira a Quantidade do Item"} handleCloseDialog={handleCloseDialog} fullWidth maxWidth="xs">
            <DialogContent>
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Box width="60%">
                        <TextField type="number" fullWidth label="Quantidade" onChange={handleChangeQuantity} value={quantity} />
                    </Box>
                    <Box width="40%" >
                        <Typography>Unitário: R$ {insertItem.item?.value ?? 0}</Typography>
                        <Typography>Total: R$ {(insertItem.item?.value ?? 1) * quantity}</Typography>
                    </Box>
                </Stack>
            </DialogContent>
            <Box width='100%'>
                <Divider />
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                    <Button variant="contained" color="primary" type='submit' onClick={insertItemOrder}>{itemAlreadyExists ? 'Atualizar' : 'Adicionar'}</Button>
                </Stack>
            </Box>
        </DialogComponent>
    )
}