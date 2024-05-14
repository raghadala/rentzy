import { SafeListing, SafeUser } from "@/app/types";
import Header from "@/app/components/Header";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";


interface ClientFavouritesProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}


const ClientFavourites:React.FC<ClientFavouritesProps> = ({
    listings, 
    currentUser
}) => {
    return(
        <Container>
            <Header
                title="Favourites"
                subtitle="List of items you have favourited "
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
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
        
    );
}

export default ClientFavourites;