'use client';
import {SafeUser, SafeListing} from "../types";
import Container from "../components/Container";
import Header from "../components/Header";
import {useRouter} from "next/navigation";
import {useState, useCallback} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface ClientItemsProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const ClientItems: React.FC<ClientItemsProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    
    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Listing deleted");
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
                title = "Listings"
                subtitle = "Your listings"
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
                {listings.map((listing: any) => (
                    <ListingCard
                        key = {listing.id}
                        data = {listing}
                        actionId = {listing.id}
                        onAction = {onDelete}
                        disabled = {deletingId === listing.id}
                        actionLabel = "Delete listing"
                        currentUser = {currentUser}
                    />
                ))}

            </div>
        </Container>
        
    );

}
export default ClientItems;