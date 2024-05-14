import EmptyState from "@/app/components/EmptyState";
import Client from "@/app/components/Client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EditClient from "./editClient";


const EditPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <Client>    
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please log in"
                />
            </Client>
        )
    }

    return(
        <Client>   
            <EditClient
                currentUser={currentUser}
            />
        </Client>
    )
}

export default EditPage;