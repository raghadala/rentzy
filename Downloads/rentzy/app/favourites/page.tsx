import EmptyState from "@/app/components/EmptyState";
import Client from "@/app/components/Client";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavouriteListings from "@/app/actions/getFavouriteListings";
import ClientFavourites from "./ClientFavourites";

const ListingPage = async () => {
    const listings = await getFavouriteListings();
    const currentUser = await getCurrentUser();
    
    if (listings.length === 0){    
        return(
            <Client>
                <EmptyState
                    title="No favourites found"
                    subtitle="Looks like you have no favourite listings"
                />
            </Client>
        )
    }
    return (
        <Client>
            <ClientFavourites
                listings = {listings}
                currentUser = {currentUser}
            />
        </Client>
            
    )
}
export default ListingPage;