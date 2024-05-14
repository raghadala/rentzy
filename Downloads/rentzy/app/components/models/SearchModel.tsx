'use client';

import Model from "./Model";
import {useRouter, useSearchParams} from "next/navigation";
import useSearchModel from "@/app/hooks/useSearchModel";
import {useState, useMemo, useCallback} from "react";
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic'
import {SelectCountryValue} from "../inputs/SelectCountry";
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Header from '../Header';
import SelectCountry from "../inputs/SelectCountry";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";


enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModel= () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModel = useSearchModel();

    const [location, setLocation] = useState<SelectCountryValue>();
    const [step,setStep] = useState(STEPS.LOCATION)
    //const [guestCount, setGuestCount] = useState(1);
    //const [roomCount, setRoomCount] = useState(1);
    //const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
    }), [location]);
    
    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);
    
    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
          return onNext();
        }
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            //guestCount,
            //roomCount,
            //bathroomCount
        };
        if (dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        },{skipNull:true});
        
        setStep(STEPS.LOCATION);
        searchModel.onClose();
        router.push(url);
    },[
        step, 
        searchModel,
        location, 
        router,
        //guestCunt, 
        //roomCount, 
        //bathroomCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO){
            return "Search"
        }
        return "Next";
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
          return undefined
        }
        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Header
                title="What do you want to rent?"
                subtitle ="Find the perfect item!"
            />
            <SelectCountry
                value = {location}
                onChange={(value) => 
                    setLocation(value as SelectCountryValue)} 
            />   
            <hr />
            <Map center={location?.latlng} />
        </div>
    )
    if (step === STEPS.DATE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Header
              title="When do you plan to rent?"
            />
            <Calendar
              onChange={(value) => setDateRange(value.selection)}
              value={dateRange}
            />
          </div>
        )
      }
    //   if (step === STEPS.INFO) {
    //     bodyContent = (
    //       <div className="flex flex-col gap-8">
    //         <Header
    //           title="More information"
    //           subtitle="Find the perfect item!"
    //         />
    //         <Counter 
    //           onChange={(value) => setGuestCount(value)}
    //           value={guestCount}
    //           title="Guests" 
    //           subtitle="How many guests are coming?"
    //         />
    //         <hr />
    //         <Counter 
    //           onChange={(value) => setRoomCount(value)}
    //           value={roomCount}
    //           title="Rooms" 
    //           subtitle="How many rooms do you need?"
    //         />        
    //         <hr />
    //         <Counter 
    //           onChange={(value) => {
    //             setBathroomCount(value)
    //           }}
    //           value={bathroomCount}
    //           title="Bathrooms"
    //           subtitle="How many bahtrooms do you need?"
    //         />
    //       </div>
    //     )
    //   }
    return(
        <Model
            isOpen={searchModel.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModel.onClose}
            body={bodyContent}
        />

    );
}
export default SearchModel;