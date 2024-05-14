'use client';
import {BiSearch} from 'react-icons/bi';
import useSearchModel from "@/app/hooks/useSearchModel";
import {useSearchParams} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {useMemo} from 'react';
import { differenceInDays } from 'date-fns';


const Search = () =>{
    const SearchModel = useSearchModel();
    const params = useSearchParams();
    const {getByValue} = useCountries();
    const locationValue = params?.get('locationValue');
    const  startDate = params?.get('startDate');
    const  endDate = params?.get('endDate');
    // const  guestCount = params?.get('guestCount');


    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere';

    },[getByValue, locationValue])

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
          const start = new Date(startDate as string);
          const end = new Date(endDate as string);
          let diff = differenceInDays(end, start);
    
          if (diff === 0) {
            diff = 1;
          }
    
          return `${diff} Days`;
        }
    
        return 'Date'
    }, [startDate, endDate]);

    // const guestLabel = useMemo(() => {
    //     if (guestCount) {
    //       return `${guestCount} Guests`;
    //     }
    
    //     return 'Add Guests';
    //   }, [guestCount]);
    
    return ( 
        <div
          onClick = {SearchModel.onOpen}
          className="
            border-[2px] 
            w-full 
            md:w-auto 
            py-2 
            square-full
            shadow-sm 
            hover:shadow-md 
            transition 
            cursor-pointer
          "
        >
        <div
            className="
                flex
                flex-row
                items-center
                justify-between
            "
            >
                <div
                    className="
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                    "
                >
                  {locationLabel}
                </div>
                    <div
                        className="
                            text-sm 
                            pl-6 
                            pr-2 
                            font-semibold 
                            flex 
                            flex-row 
                            items-center 
                            gap-3
                        ">
                        <div className="hidden sm:block">{durationLabel}</div>
                        <div
                            className="
                                p-2
                                bg-blue-900
                                rounded-full
                                text-white
                                items-center
                                ">
                                <BiSearch size={18} />
                        </div>
                 </div>
            </div>
        </div>
    );
}
export default Search;