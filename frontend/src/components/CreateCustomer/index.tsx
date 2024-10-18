import { useState } from "react"

import DialogComponent from "../Dialog"

import { Box, Button, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material"
import { customerService } from "../../services/customerService"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface ICreateCustomerProps {
    openDialog: boolean,
    setOpenDialog(state: boolean): void,
    getCustomers(): void
}

export default function CreateCustomer({ openDialog, setOpenDialog, getCustomers }: ICreateCustomerProps) {

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

        customerService.postCustomer({ name, cpf, phone, email, address }).then(() => {
            toast.success(`${name} cadastrado com sucesso!`)
            setOpenDialog(false)
            getCustomers()
        }).catch(err => {
            toast.error(`${err.message}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCloseDialog = () => setOpenDialog(false)

    return (
        openDialog &&
        <DialogComponent title="Cadastrar Cliente" handleCloseDialog={handleCloseDialog} >
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField type="text" fullWidth name="email" id="email" label="E-mail" required />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField type="text" fullWidth name="name" id="name" label="Nome" required />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField type="text" fullWidth name="cpf" id="cpf" label="CPF" required />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField type="text" fullWidth name="phone" id="phone" label="Celular" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="text" fullWidth name="address" id="address" label="Endereço" />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <Box width='100%'>
                    <Divider />
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={handleCloseDialog} >Fechar</Button>
                        <LoadingButton loading={loading} variant="contained" color="primary" type='submit' >Confirmar</LoadingButton>
                    </Stack>
                </Box>
            </Box>
        </DialogComponent >
    )
}