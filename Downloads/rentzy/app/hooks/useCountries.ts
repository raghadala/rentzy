import countries from "world-countries";

import "country-state-city";
import { useState } from "react";
  

const formattedCountries= countries.map((country) => ({
    value:country.cca2,
    label:country.name.common,
    flag:country.flag,
    latlng:country.latlng,
    region:country.region
}));


const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value:string) => {
        return formattedCountries.find((item) => item.value === value);
    }
    return{
        getAll,
        getByValue

    }
};


export default useCountries;