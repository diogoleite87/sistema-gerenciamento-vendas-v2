import { useState } from "react";

import ToggleTheme from "../ToggleTheme";

import { Box, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";


export default function LoginContainer() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const { signIn } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email') ? String(data.get('email')) : '';
        const password = data.get('password') ? String(data.get('password')) : '';
        const remember = data.get('remember') ? true : false

        setLoading(true)

        toast.promise(
            userService.authLogin({ email, password }), {
            pending: 'Entrando...',
            success: 'Acesso liberado!',
            error: 'Verifique as credencias.'
        }).then(res => {
            signIn({ user_token: res.data.user_token, user: res.data.user }, remember)
            navigate('/')
        }).catch(_err => {
            setError(true)
            setLoading(false)
        })

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <Container maxWidth="sm" component='main'>
            <Box
                justifyContent='center'
                alignItems='center'
                display='flex'
                height='100vh'
            >
                <Box position='absolute' right={0} top={0} m={3}>
                    <ToggleTheme />
                </Box>
                <Paper elevation={2}>
                    <Stack spacing={2}
                        p={5}
                        direction='column'
                        component='form'
                        onSubmit={handleSubmit}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            id="email"
                            name="email"
                            error={error}
                            autoFocus
                            autoComplete="email"
                            disabled={loading}
                            required
                        />

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="password" required error={error}>Senha</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                label="Senha"
                                fullWidth
                                id="password"
                                name="password"
                                error={error}
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
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            id="remember"
                            name="remember"
                            label="Manter conectado"
                            disabled={loading}
                        />
                        <LoadingButton
                            size="large"
                            variant="contained"
                            loading={loading}
                            fullWidth
                            type="submit"
                            disabled={loading}
                        >
                            Entrar
                        </LoadingButton>
                    </Stack>
                </Paper>
            </Box>
        </Container >
    )
}