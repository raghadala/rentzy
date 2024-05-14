'use client';
import {FiList } from "react-icons/fi";
import Avatar from '../Profile';
import {useCallback, useState} from 'react';
import MenuItems from './MenuItems';
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from '@/app/hooks/useLoginModel';
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModel from "@/app/hooks/newRentModel";
import {useRouter} from "next/navigation";

interface MenuProps{
    currentUser?: SafeUser | null
}

const Menu: React.FC<MenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const rentModel = useRentModel();
    const[isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);

    },[]);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModel.onOpen();
        }

        rentModel.onOpen();
    },[currentUser, loginModel, rentModel]);

    return(
        <div className = "relative">
            <div className = "flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        square-full
                        hover:bg-neutral-100
                        transiton
                        cursor-pointer 
                    "
                >
                    Rentzy your items                
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                    >
                        <FiList />
                        <div className="hidden md:block">
                            <Avatar src= {currentUser?.image}/>
                        </div>       
                </div>
            </div>

            {isOpen && (
                <div 
                    className="
                        absolute 
                        square-xl 
                        shadow-md
                        w-[40vw]
                        md:w-3/4 
                        bg-white 
                        overflow-hidden 
                        right-0 
                        top-12 
                        text-sm
                    "
                >
                    <div className = "flex flex-col cursor-pointer">
                        {currentUser ?(
                            <>
                            <MenuItems
                                onClick={() => router.push("/rentals")}
                                label="My Rentals"
                            />
                            <MenuItems
                                onClick={() => router.push("/favourites")}
                                label="My Favourites"
                            />
                            <MenuItems
                                onClick={() => router.push("/reservations")}
                                label="My Reservations"
                            />
                            <MenuItems
                                onClick={() => router.push("/items")}
                                label="My Listings"
                            />
                            <MenuItems
                                onClick={rentModel.onOpen}
                                label="Rentzy my items"
                            />
                            <hr/>
                            <MenuItems
                                onClick={() => router.push("/edit")}
                                label="Edit my account"
                            />
                            <MenuItems
                                onClick={() => signOut()}
                                label="Log out"
                            />
                        </>

                        ): (

                            <>
                                <MenuItems
                                    onClick={loginModel.onOpen}
                                    label="Log in"
                                />
                                <MenuItems
                                    onClick={registerModel.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}   
                    </div>
                </div>
            )}
        </div>
    );
}
export default Menu;
