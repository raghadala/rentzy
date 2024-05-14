import getListingById from "@/app/actions/getListingById";
import Client from "@/app/components/Client";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservation from "@/app/actions/getReservation";

interface IParams{
    listingId?:string,
}

const ListingPage = async({params}:{params:IParams}) => {
    const listing = await getListingById(params);
    const rentals = await getReservation(params);
    const currentUser = await getCurrentUser();
    if(!listing){
        return(
            <Client>
                <EmptyState/>
            </Client>
        )
    }


    return (
        <Client>
            <ListingClient
            listing={listing}
            rentals={rentals}
            currentUser={currentUser}
            />
        </Client>
    );
}
export default ListingPage;