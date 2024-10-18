import { useState } from "react"

import DialogComponent from "../Dialog"

import { Box, Button, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material"
import { categoryService } from "../../services/categoryService"
import { DialogCategoryProps } from "../CategoryContainer"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface IUpdateCategoryProps {
    updateCategory: DialogCategoryProps,
    setUpdateCategory: (state: DialogCategoryProps) => void,
    getCategories(): void
}

export default function UpdateCategory({ updateCategory, setUpdateCategory, getCategories }: IUpdateCategoryProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const description = String(data.get('description'))

        setLoading(true)

        categoryService.putCategory({ name, description }, updateCategory.category?.id ?? 0).then(() => {
            toast.success(`${name} atualizado com sucesso!`)
            getCategories()
            handleCloseDialog()
        }).catch(err => {
            toast.error(`${err.message}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCloseDialog = () => setUpdateCategory({
        openDialog: false,
        category: undefined
    })


    return (
        updateCategory.openDialog &&
        <DialogComponent title="Atualizar Categoria" handleCloseDialog={handleCloseDialog} >
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContent>
                        <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column'  >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <TextField type="text" fullWidth name="name" id="name" label="Nome" required defaultValue={updateCategory.category?.name} />
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField type="text" fullWidth name="description" id="description" label="Descrição" required defaultValue={updateCategory.category?.description} />
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