import prisma from "@/app/libs/prismadb";

interface IParams{
    listingId?: string, 
    userId?: string,
    authorId?: string;
}

export default async function getReservation(
    params: IParams
)   {
    try {

        const {listingId, userId, authorId} = params;
        const query: any ={};

        if (listingId){
            query.listingId = listingId;
        }

        if (userId){
            query.userId = userId
        }

        if (authorId){
            query.listing = {userId: authorId}
        }

        const rentals = await prisma.rental.findMany({
            where: query,
            include: {
                listing:true,
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        const safeReservations = rentals.map(
            (rental) => ({
                ...rental,
                createdAt: rental.createdAt.toISOString(),
                startDate: rental.startDate.toISOString(),
                endDate: rental.endDate.toISOString(),
                listing: {
                    ...rental.listing,
                    createdAt: rental.listing.createdAt.toISOString()
                }
            })
        );
        return safeReservations;
    }   catch(error: any){
        throw new Error(error);
    }
}