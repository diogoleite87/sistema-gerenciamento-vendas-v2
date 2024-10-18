import UserContainer from "../../components/UserContainer";
import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";

export default function User() {

    return (
        <DashboardContainer>
            <PageTitle text="Gerenciador de Funcionários" />
            <UserContainer />
        </DashboardContainer>
    )
}