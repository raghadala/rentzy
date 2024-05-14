import EmptyState from "@/app/components/EmptyState";
import Client from "@/app/components/Client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservation";
import ReservationClient from "./ReservationClient";


const ReservationsPage = async() => {
    const currentUser = await getCurrentUser();

    if (!currentUser){
        return(
            <Client>
                <EmptyState
                    title = "Unauthorized"
                    subtitle = "Please login"
                />
            </Client>
        );
    }
    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length === 0){
        return (
            <Client>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like nobody has reserved your items."
                />
            </Client>
        )
    }
    return(
        <Client>
            <ReservationClient
                reservations = {reservations}
                currentUser = {currentUser}
            />
        </Client>
    )
};
export default ReservationsPage;