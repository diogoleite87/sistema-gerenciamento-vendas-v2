import { Box, CircularProgress, Typography } from "@mui/material"

export default function BackdropLoading() {

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <CircularProgress size={80} thickness={4} />
            <Typography variant="body1" color="textSecondary" m={3}>
                Carregando...
            </Typography>
        </Box>
    )
}