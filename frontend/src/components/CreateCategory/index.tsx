import { useState } from "react"

import DialogComponent from "../Dialog"

import { Box, Button, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material"
import { categoryService } from "../../services/categoryService"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface ICreateCategoryProps {
    openDialog: boolean,
    setOpenDialog(state: boolean): void,
    getCategories(): void
}

export default function CreateCategory({ openDialog, setOpenDialog, getCategories }: ICreateCategoryProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const description = String(data.get('description'))

        setLoading(true)


        categoryService.postCategory({ name, description }).then(() => {
            toast.success(`${name} cadastrado com sucesso!`)
            setOpenDialog(false)
            getCategories()
        }).catch(err => {
            toast.error(`${err.message}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCloseDialog = () => setOpenDialog(false)

    return (
        openDialog &&
        <DialogComponent title="Cadastrar Categoria" handleCloseDialog={handleCloseDialog} >
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField type="text" fullWidth name="name" id="name" label="Nome" required />
                            </Grid>
                            <Grid item xs={9}>
                                <TextField type="text" fullWidth name="description" id="description" label="Descrição" required />
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