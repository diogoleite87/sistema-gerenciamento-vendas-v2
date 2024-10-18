import HomeContainer from "../../components/HomeContainer";
import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";

export default function Home() {

    return (
        <DashboardContainer>
            <PageTitle text="Início" />
            <HomeContainer />
        </DashboardContainer>
    )
}