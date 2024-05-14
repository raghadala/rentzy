'use client';

import Select from 'react-select';
import useCountries from "@/app/hooks/useCountries";
import "country-state-city" 

export type SelectCountryValue = {
    flag:string;
    label:string;
    latlng: number[];
    region:string;
    value:string;
}

interface SelectCountryProps{
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
    value,
    onChange
}) => {
    const {getAll} = useCountries();
    return(
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()} 
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
                formatOptionLabel = {(option:any) => (
                    <div className = "flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}, 
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => "text-lg"
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'navy',
                        primary25: '#dce5fa'
                    }
                })}
            />
        </div>
    );
}

export default SelectCountry;