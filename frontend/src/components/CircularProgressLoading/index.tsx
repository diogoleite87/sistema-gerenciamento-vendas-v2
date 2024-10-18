import { Box, CircularProgress, Grid } from "@mui/material";

export default function CircularProgressLoading() {

    return (
        <Grid item xs={12}>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <CircularProgress />
            </Box>
        </Grid>
    )
}