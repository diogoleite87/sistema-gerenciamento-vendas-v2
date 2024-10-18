import { useState } from "react"

import DialogComponent from "../Dialog"

import {
    Box, Button, DialogContent, Divider, FormControl, Grid, IconButton, InputAdornment,
    InputLabel, OutlinedInput, Stack, TextField
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { userService } from "../../services/userService"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"


interface ICreateUserProps {
    openDialog: boolean,
    setOpenDialog(state: boolean): void,
    getUsers(): void
}

export default function CreateUser({ openDialog, setOpenDialog, getUsers }: ICreateUserProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const description = String(data.get('description'))
        const password = String(data.get('password'))
        const email = String(data.get('email'))

        setLoading(true)

        userService.postUser({ name, description, password, email }).then(() => {
            toast.success(`${name} cadastrado com sucesso!`)
            setOpenDialog(false)
            getUsers()
        }).catch(err => {
            toast.error(`${err.message}}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCloseDialog = () => setOpenDialog(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        openDialog &&
        <DialogComponent title="Cadastrar Funcionário" handleCloseDialog={handleCloseDialog} >
            <Box component='form' onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column' >
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField type="text" fullWidth name="email" id="email" label="E-mail" required />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type="text" fullWidth name="name" id="name" label="Nome" required />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="password" required >Senha</InputLabel>
                                    <OutlinedInput
                                        type={showPassword ? 'text' : 'password'}
                                        label="Senha"
                                        fullWidth
                                        id="password"
                                        name="password"
                                        autoComplete="password"
                                        disabled={loading}
                                        required
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    disabled={loading}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl >
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="text" fullWidth name="description" id="description" label="Descrição" />
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