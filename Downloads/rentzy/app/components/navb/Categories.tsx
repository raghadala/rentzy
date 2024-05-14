'use client';

import Container from "../Container";

import { BiSolidTShirt } from "react-icons/bi"; //clothing
import { BiFridge } from "react-icons/bi"; // appliances
import { BiFootball } from "react-icons/bi"; // sporting goods
import { AiFillCar } from "react-icons/ai"; // vehicles
import { BsHouseDoorFill } from "react-icons/bs"; // housing
import { FaCouch } from "react-icons/fa"; // furniture
import { BsHeadphones } from "react-icons/bs"; // electronics
import { VscSymbolMisc } from "react-icons/vsc";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Clothing',
        icon: BiSolidTShirt,
        description: 'Clothing apparel rentals!'
    },
    {
        label: 'Appliances',
        icon: BiFridge,
        description: 'Appliance rentals!'
    },
    {
        label: 'Sporting Goods',
        icon: BiFootball,
        description: 'Sporting goods rentals!'
    },
    {
        label: 'Furniture',
        icon: FaCouch,
        description: 'Furniture rentals!'
    },
    {
        label: 'Electronics',
        icon: BsHeadphones,
        description: 'Electronic rentals!'
    },
    {
        label: 'Vehicles',
        icon: AiFillCar,
        description: 'Vehicle rentals!'
    },
    {
        label: 'Housing',
        icon: BsHouseDoorFill,
        description: 'Housing rentals!'
    },
    {
        label: 'Miscellaneous',
        icon: VscSymbolMisc,
        description: 'All other miscellaneous rentals!'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    
    const isMainPage = pathname == '/';
    if(!isMainPage){
        return null;
    }

    return (
        <Container>
            <div
                className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox 
                        key = {item.label}
                        label = {item.label}
                        selected = {category == item.label}
                        icon = {item.icon}
                        />
                ))}

            </div>
        </Container>
    );
}

export default Categories;