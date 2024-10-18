import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";
import CategoryContainer from "../../components/CategoryContainer";

export default function Category() {

    return (
        <DashboardContainer>
            <PageTitle text="Categorias" />
            <CategoryContainer />
        </DashboardContainer>
    )
}