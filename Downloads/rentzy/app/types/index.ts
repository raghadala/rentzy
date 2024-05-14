import { Listing, User, Rental } from "@prisma/client";

export type SafeListing= Omit<
    Listing, 
    "CreatedAt"
> & {
    createdAt: string;
}
export type SafeReservation=Omit<
    Rental,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string,
    startDate: string,
    endDate : string,
    listing: SafeListing;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};