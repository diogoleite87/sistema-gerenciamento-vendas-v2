import { useState } from "react"

import SelectCategory from "../SelectCategory"
import DialogComponent from "../Dialog"
import ImageCrop from "../ImageCrop"

import { Box, Button, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material"
import { DialogItemProps, SelectCategoryProps } from "../ItemContainer"
import { itemService } from "../../services/itemService"
import { base64ToImage } from "../../utils/convertImage"
import { Category } from "../../schemas/models"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface IUpdateItemProps {
    updateItem: DialogItemProps,
    setUpdateItem: (state: DialogItemProps) => void,
    getItems(): void,
    categories?: SelectCategoryProps
}


export default function UpdateItem({ updateItem, setUpdateItem, getItems, categories }: IUpdateItemProps) {

    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(updateItem.item?.category)
    const [image, setImage] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const description = String(data.get('description'))
        const value = Number(data.get('value'))
        const stock = Number(data.get('stock'))

        setLoading(true)

        itemService.putItem({ name, description, value, stock, categoryId: selectedCategory?.id ?? 0, image }, updateItem.item?.id ?? 0).then(() => {
            toast.success(`${name} atualizado com sucesso!`)
            handleCloseDialog()
            getItems()
        }).catch(err => {
            toast.error(`${err.message}`)
        }).finally(() => {
            handleCloseDialog()
        })

        setLoading(false)
    }

    const handleCloseDialog = () => setUpdateItem({
        openDialog: false,
        item: undefined
    })

    return (
        updateItem.openDialog &&
        <DialogComponent title="Cadastrar Item" handleCloseDialog={handleCloseDialog} maxWidth="xl" fullWidth>
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    <Box component='img' src={base64ToImage(updateItem.item?.image ?? '', updateItem.item?.name ?? '').src} />
                                </Box>
                                <Box mt={2}>

                                    <ImageCrop aspect="1:1" setImage={setImage} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type="text" fullWidth name="name" id="name" label="Nome" required defaultValue={updateItem.item?.name} />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectCategory required categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField type="number" fullWidth name="value" id="value" label="Valor" required defaultValue={updateItem.item?.value} />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField type="number" fullWidth name="stock" id="stock" label="Estoque" required defaultValue={updateItem.item?.stock} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="text" fullWidth name="description" id="description" label="Descrição" required defaultValue={updateItem.item?.description} />
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