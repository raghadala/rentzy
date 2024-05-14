import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/Client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientItems from "./ClientItems";
import getListings from "../actions/getListings";


const ItemsPage = async() => {
    const currentUser = await getCurrentUser();

    if (!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title = "Unauthorized"
                subtitle = "Please login"
                />
            </ClientOnly>
        )
    }
    const listings = await getListings({
        userId: currentUser.id
    });

    if (listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title = "No listings found"
                subtitle = "Looks like you have no listings"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ClientItems
                listings = {listings}
                currentUser = {currentUser}
            />   
        </ClientOnly>
    )
}
export default ItemsPage;