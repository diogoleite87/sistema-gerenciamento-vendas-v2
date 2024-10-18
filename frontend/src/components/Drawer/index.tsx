import MuiDrawer from '@mui/material/Drawer'

import { Divider, IconButton, Toolbar } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { DrawerListItem } from '../ListItem'

// import Icon from '../../images/horizontal-icon.png'

interface DrawerProps {
    open: boolean
    toggleDrawer(): void
}

interface DrawerSetupProps {
    open?: boolean
}

// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     width: '100px'
// });

const DrawerSetup = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open'
})<DrawerSetupProps>(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9)
            }
        })
    }
}))

export function Drawer({ open, toggleDrawer }: DrawerProps) {
    return (
        <DrawerSetup variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1]
                }}
            >
                {/* <Img src={Icon} /> */}
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeft />
                </IconButton>
            </Toolbar>
            <Divider />
            <DrawerListItem />
        </DrawerSetup>
    )
}