import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CustomerIcon from '../../images/customer.png'
import CategoryIcon from '../../images/category.png'
import OrderIcon from '../../images/order.png'
import ItemIcon from '../../images/item.png'
import UserIcon from '../../images/user.png'

interface Card {
    title: string,
    image: string,
    description: string,
    url: string
}

const cards: Card[] = [
    {
        title: "Clientes",
        image: CustomerIcon,
        description: "Acesse e gerencie informações sobre os clientes da empresa, como dados de contato, histórico de compras e preferências.",
        url: "/customer"
    },
    {
        title: "Pedidos",
        image: OrderIcon,
        description: "Visualize e gerencie os pedidos feitos pelos clientes, incluindo detalhes dos produtos ou serviços solicitados e status do pedido.",
        url: "/order"
    },
    {
        title: "Categorias",
        image: CategoryIcon,
        description: "Gerencie as categorias de produtos ou serviços oferecidos pela empresa para organizar e facilitar as vendas.",
        url: "/category"
    },
    {
        title: "Itens",
        image: ItemIcon,
        description: "Explore e atualize os itens disponíveis para venda, incluindo detalhes como preço, estoque e descrição.",
        url: "/item"
    },
    {
        title: "Funcionários",
        image: UserIcon,
        description: "Acesse e gerencie informações sobre os funcionários da empresa, incluindo dados pessoais, cargos e permissões de acesso ao sistema.",
        url: "/user"
    }
];


export default function HomeContainer() {

    const navigate = useNavigate()

    const handleNavigate = (url: string) => {
        navigate(url)
    }

    return (
        <Grid container spacing={3} mt={2}>
            {cards.map((card, index) => (
                <Grid item xs={6} key={index} >
                    <Card>
                        <CardMedia
                            component="img"
                            height="180"
                            image={card.image}
                            alt={card.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {card.title}
                            </Typography>
                            <Box mt={1} display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant="body2" color="text.secondary" width='80%'>
                                    {card.description}
                                </Typography>
                                <Button variant="contained" size="small" onClick={() => handleNavigate(card.url)}>
                                    Navegar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}