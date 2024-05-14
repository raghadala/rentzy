'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";


interface ListingCardProps {
    data: SafeListing;
    rental?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    rental,
    onAction,
    disabled,
    actionLabel,
    currentUser,
    actionId=""
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disabled){
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

        const price = useMemo(() =>{
            if(rental) {
                return rental.totalPrice;
            }
            return data.price;
        },[rental, data.price]);

        const rentalDate= useMemo(() =>{
            if(!rental){
                return null;
            }
            const start= new Date(rental.startDate);
            const end = new Date(rental.endDate);

            return `${format(start, 'PP')} - ${format(end, 'PP')}`
        },[rental]);

    return(
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className=" flex flex-col gap-2 w-full">
                <div className="
                aspect-square
                w-full
                relative
                overflow-hidden
                rounded-xl
                "
                >
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {data.title}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {rentalDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!rental && (
                        <div className="font-light">
                            per day
                        </div>
                    )}
                </div>
                {onAction && actionLabel &&(
                    <Button
                        disabled ={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default ListingCard;