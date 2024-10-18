import PageTitle from "../../components/PageTitle";
import OrderById from "../../components/OrderById";

import { DashboardContainer } from "../../components/DashboardContainer";
import { useNavigate, useParams } from "react-router-dom";

export default function Order() {

    const { id } = useParams();

    const navigate = useNavigate()


    const deleteSuccess = () => {
        navigate('/')
    }

    return (
        <DashboardContainer>
            <PageTitle text={`Pedido ID: #${id}`} />
            <OrderById id={Number(id) ?? 0} deleteSucess={deleteSuccess} />
        </DashboardContainer>
    )
}