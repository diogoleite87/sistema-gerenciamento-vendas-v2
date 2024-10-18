import { useState } from "react"

import SelectCategory from "../SelectCategory"
import DialogComponent from "../Dialog"
import ImageCrop from "../ImageCrop"

import { Box, Button, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material"
import { itemService } from "../../services/itemService"
import { SelectCategoryProps } from "../ItemContainer"
import { Category } from "../../schemas/models"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface ICreateItemProps {
    openDialog: boolean,
    setOpenDialog(state: boolean): void,
    getItems(): void,
    categories?: SelectCategoryProps
}


export default function CreateItem({ openDialog, setOpenDialog, getItems, categories }: ICreateItemProps) {

    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<string | undefined>(undefined)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const description = String(data.get('description'))
        const value = Number(data.get('value'))
        const stock = Number(data.get('stock'))


        if (image) {
            setLoading(true)

            itemService.postItem({ name, description, value, stock, categoryId: selectedCategory?.id ?? 0, image }).then(() => {
                toast.success(`${name} cadastrado com sucesso!`)
                setOpenDialog(false)
                getItems()
            }).catch(err => {
                toast.error(`${err.message}`)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            toast.warning('Selecione uma imagem para o item.')
        }

    }

    const handleCloseDialog = () => setOpenDialog(false)

    return (
        openDialog &&
        <DialogComponent title="Cadastrar Item" handleCloseDialog={handleCloseDialog} maxWidth="xl" fullWidth>
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ImageCrop aspect="1:1" setImage={setImage} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type="text" fullWidth name="name" id="name" label="Nome" required />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectCategory required categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField type="number" fullWidth name="value" id="value" label="Valor" required />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField type="number" fullWidth name="stock" id="stock" label="Estoque" required />
                            </Grid>
                            <Grid item xs={12}>
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