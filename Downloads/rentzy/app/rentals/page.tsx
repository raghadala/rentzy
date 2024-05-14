import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/Client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservation from "@/app/actions/getReservation";
import RentalsClient from "./RentalsClient";


const RentalsPage = async() => {
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
    const rentals = await getReservation({
        userId: currentUser.id
    });

    if (rentals.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title = "No rentals found"
                subtitle = "Looks like you haven't rented any items"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <RentalsClient
                rentals = {rentals}
                currentUser = {currentUser}
            />   
        </ClientOnly>
    )
}
export default RentalsPage;