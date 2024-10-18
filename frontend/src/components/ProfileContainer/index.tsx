import { useEffect, useState } from "react";

import { Alert, AlertTitle, Box, CircularProgress, Stack, TextField } from "@mui/material";
import { userService } from "../../services/userService";
import { Profile } from "../../schemas/models";
import { toast } from "react-toastify";

export default function ProfileContainer() {

    const [loading, setLoading] = useState<boolean>(false)
    const [profile, setProfile] = useState<Profile>()

    const getProfile = () => {

        setLoading(true)

        userService.getProfile().then(res => {
            setProfile(res.data)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (

        loading ?
            <Box display='flex' justifyContent='center' alignItems='center'>
                <CircularProgress />
            </Box> :
            <Stack width='100%' spacing={3} mt={5}>
                <TextField type="text" name="id" id="id" fullWidth label='ID' defaultValue={profile?.id} InputProps={{ readOnly: true }} />
                <TextField type="email" name="email" id="email" fullWidth label='E-mail' defaultValue={profile?.email} InputProps={{ readOnly: true }} />
                <TextField type="text" name="name" id="name" fullWidth label='Nome' defaultValue={profile?.name} InputProps={{ readOnly: true }} />
                <TextField type="text" name="description" id="description" fullWidth label='Descrição' defaultValue={profile?.description} InputProps={{ readOnly: true }} />
                {
                    profile?.type == 1 ?
                        <Alert severity="info">
                            <AlertTitle>
                                Usuário Administrador
                            </AlertTitle>
                            Como usuário administrador, você possui privilégios especiais que permitem adicionar, excluir e editar usuários comuns. Isso significa que você tem controle total sobre a gestão de usuários na plataforma. Sinta-se à vontade para realizar operações como adicionar novos usuários, remover usuários existentes e editar as informações dos usuários conforme necessário para manter a integridade do sistema.
                        </Alert> :
                        <Alert severity="info">
                            <AlertTitle>
                                Usuário Simples
                            </AlertTitle>
                            Como usuário simples, seu acesso é limitado. Para obter informações adicionais ou assistência, por favor, entre em contato com o administrador do sistema. Eles estarão disponíveis para fornecer suporte e esclarecer quaisquer dúvidas que você possa ter.
                        </Alert>
                }
            </Stack>
    )
}