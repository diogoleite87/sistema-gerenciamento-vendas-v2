import MuiAppBar from '@mui/material/AppBar'
import ProfileButton from '../ProfileButton'
import ToggleTheme from '../ToggleTheme'

import { Typography, IconButton, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Menu } from '@mui/icons-material'

interface AppBarProps {
    open?: boolean
    toggleDrawer(): void
}

interface AppBarSetup {
    open?: boolean
}

const AppBarSetup = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open'
})<AppBarSetup>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}))

export function AppBar({ open, toggleDrawer }: AppBarProps) {

    return (
        <AppBarSetup position="absolute" open={open}>
            <Toolbar sx={{ pr: '24px' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open-drawer"
                    onClick={toggleDrawer}
                    sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                >
                    <Menu />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    noWrap
                    fontWeight={700}
                    fontSize={25}
                    sx={{ flexGrow: 1 }}
                >
                    {`Sistema Gerenciador de Vendas`}
                </Typography>
                <ToggleTheme />
                <ProfileButton />
            </Toolbar>
        </AppBarSetup>
    )
}