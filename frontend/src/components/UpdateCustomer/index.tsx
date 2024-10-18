import { useState } from "react"

import DialogComponent from "../Dialog"

import { Box, Button, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material"
import { customerService } from "../../services/customerService"
import { DialogCustomerProps } from "../CustomerContainer"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface IUpdateCustomerProps {
    updateCustomer: DialogCustomerProps,
    setUpdateCustomer: (state: DialogCustomerProps) => void,
    getCustomers(): void
}

export default function UpdateCustomer({ updateCustomer, setUpdateCustomer, getCustomers }: IUpdateCustomerProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const cpf = String(data.get('cpf'))
        const phone = String(data.get('phone'))
        const email = String(data.get('email'))
        const address = String(data.get('address'))

        setLoading(true)

        customerService.putCustomer({ name, cpf, phone, email, address }, updateCustomer.customer?.id ?? 0).then(() => {
            toast.success(`${name} atualizado com sucesso!`)
            getCustomers()
            handleCloseDialog()
        }).catch(err => {
            toast.error(`${err.message}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCloseDialog = () => setUpdateCustomer({
        openDialog: false,
        customer: undefined
    })


    return (
        updateCustomer.openDialog &&
        <DialogComponent title="Atualizar Cliente" handleCloseDialog={handleCloseDialog} >
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContent>
                        <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column'  >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <TextField type="text" fullWidth name="email" id="email" label="E-mail" required defaultValue={updateCustomer.customer?.email} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField type="text" fullWidth name="name" id="name" label="Nome" required defaultValue={updateCustomer.customer?.name} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField disabled type="text" fullWidth name="cpf" id="cpf" label="CPF" required defaultValue={updateCustomer.customer?.cpf} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField type="text" fullWidth name="phone" id="phone" label="Celular" defaultValue={updateCustomer.customer?.phone} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField type="text" fullWidth name="address" id="address" label="Endereço" defaultValue={updateCustomer.customer?.address} />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                </DialogContent>
                <Box width='100%'>
                    <Divider />
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                        <LoadingButton loading={loading} variant="contained" color="primary" type='submit' >Atualizar</LoadingButton>
                    </Stack>
                </Box>
            </Box>
        </DialogComponent >
    )
}