'use client';
import {SafeReservation, SafeUser} from "../types";
import Container from "../components/Container";
import Header from "../components/Header";
import {useRouter} from "next/navigation";
import {useState, useCallback} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface RentalsClientProps{
    rentals: SafeReservation[];
    currentUser?: SafeUser | null;
}

const RentalsClient: React.FC<RentalsClientProps> = ({
    rentals,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
        })
        .catch((error) => {
            toast.error('Something went wrong.');
        })
        .finally(() => {
            setDeletingId(' ');
        });
    },[router]);


    return(
        <Container>
            <Header
                title = "Rentals"
                subtitle = "What you've rented and what you're renting"
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {rentals.map((rental) => (
                    <ListingCard
                        key = {rental.id}
                        data = {rental.listing}
                        rental = {rental}
                        actionId = {rental.id}
                        onAction = {onCancel}
                        disabled = {deletingId === rental.id}
                        actionLabel = "Cancel reservation"
                        currentUser = {currentUser}
                    />
                ))}

            </div>
        </Container>
        
    );

}
export default RentalsClient;