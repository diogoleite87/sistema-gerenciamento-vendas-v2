import { useState } from 'react'

import { Box, Container, CssBaseline, Grid } from '@mui/material'
import { AppBar } from '../AppBar'
import { Drawer } from '../Drawer'

interface DashboardContainerProps {
    children?: React.ReactNode
}

export function DashboardContainer({ children }: DashboardContainerProps) {
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => setOpen(!open)

    return (
        <Box display="flex">
            <CssBaseline />
            <AppBar open={open} toggleDrawer={toggleDrawer} />
            <Drawer open={open} toggleDrawer={toggleDrawer} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 14, mb: 6 }}>
                    <Grid container spacing={3}>
                        {children}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}