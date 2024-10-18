import ProfileContainer from "../../components/ProfileContainer";
import PageTitle from "../../components/PageTitle";

import { DashboardContainer } from "../../components/DashboardContainer";

export default function Profile() {

    return (
        <DashboardContainer>
            <PageTitle text="Meu Perfil" />
            <ProfileContainer />
        </DashboardContainer>
    )
}