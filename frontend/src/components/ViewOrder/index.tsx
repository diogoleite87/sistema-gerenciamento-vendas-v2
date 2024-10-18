import DialogComponent from "../Dialog"
import OrderById from "../OrderById"

import { Box, Button, DialogContent, Divider, Stack } from "@mui/material"
import { DialogOrderProps } from "../OrderContainer"


interface IViewProps {
    viewOrder: DialogOrderProps,
    setViewOrder(state: DialogOrderProps): void,
    getOrders(): void
}


export default function ViewOrder({ viewOrder, setViewOrder, getOrders }: IViewProps) {


    const handleCloseDialog = () => {
        setViewOrder({
            order: undefined,
            openDialog: false
        })
    }

    const handleDeleteSuccess = () => {
        getOrders()
        handleCloseDialog()
    }

    return (
        viewOrder.openDialog &&
        <DialogComponent title={`Pedido ID: #${viewOrder.order?.id}`} handleCloseDialog={handleCloseDialog} maxWidth="xl" fullWidth>
            <DialogContent>
                <OrderById id={viewOrder.order?.id ?? 0} deleteSucess={handleDeleteSuccess} />
            </DialogContent>
            <Box width='100%'>
                <Divider />
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                </Stack>
            </Box>
        </DialogComponent >
    )
}