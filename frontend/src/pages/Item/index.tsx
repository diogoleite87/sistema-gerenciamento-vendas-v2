import ItemContainer from "../../components/ItemContainer";
import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";

export default function Item() {

    return (
        <DashboardContainer>
            <PageTitle text="Itens" />
            <ItemContainer />
        </DashboardContainer>
    )
}