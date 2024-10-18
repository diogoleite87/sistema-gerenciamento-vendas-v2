import CustomerContainer from "../../components/CustomerContainer";
import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";

export default function Customer() {

    return (
        <DashboardContainer>
            <PageTitle text="Clientes" />
            <CustomerContainer />
        </DashboardContainer>
    )
}