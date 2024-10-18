import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";
import OrderContainer from "../../components/OrderContainer";

export default function Orders() {

    return (
        <DashboardContainer>
            <PageTitle text="Pedidos" />
            <OrderContainer />
        </DashboardContainer>
    )
}