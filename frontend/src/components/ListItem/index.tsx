import { Category, Home, Inventory, ListAlt, People, SupervisedUserCircle } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface MyListItemProps {
    icon: JSX.Element
    router: string
    iconText: string
}

function MyListItem({ icon, router, iconText }: MyListItemProps) {

    const navigate = useNavigate()

    const handleSection = () => navigate(router)

    return (
        <ListItem onClick={handleSection} >
            <ListItemButton sx={{ p: 1, borderRadius: 2 }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={iconText} />
            </ListItemButton>
        </ListItem>
    )
}

export function DrawerListItem() {

    const { authData } = useAuth()

    return (
        <List>
            <MyListItem icon={<Home />} router='/' iconText="Início" />
            {
                authData?.user.type == 1 && <MyListItem icon={<SupervisedUserCircle />} router='/user' iconText="Funcionários" />
            }
            <MyListItem icon={<People />} router='/customer' iconText="Clientes" />
            <MyListItem icon={<Category />} router='/category' iconText="Categorias" />
            <MyListItem icon={<Inventory />} router='/item' iconText="Itens" />
            <MyListItem icon={<ListAlt />} router='/order' iconText="Pedidos" />

        </List>
    )
}