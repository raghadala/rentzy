'use client';
import useRentModel from "@/app/hooks/newRentModel";
import Model from "./Model";
import { useMemo, useState } from "react";
import Header from "../Header";
import { categories } from "../navb/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectCountry from "../inputs/SelectCountry";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY=0,
    LOCATION=1,
    //INFO=2,
    IMAGES=2,
    DESCRIPTION=3,
    PRICE= 4
}

const RentModel = () => {
    const router = useRouter();
    const rentModel = useRentModel();

    const[step, setStep] = useState(STEPS.CATEGORY);
    const[isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location:null,
            //condition: '',
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
            
        }
    });

    const category = watch('category');
    const location = watch('location');
    const imageSrc= watch('imageSrc');


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr:false
    }), [location]);

    const setCustomValue = (id:string, value:any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value -1);
    }

    const onNext = () =>{
        setStep((value) => value +1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(step !== STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings',data)
        .then(() =>{
            toast.success("Listing Created!");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModel.onClose();
        })
        .catch(() =>{
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }


    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create';
        }

        return 'Next';
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined;
        }

        return 'Back';
      },[step]);

    let bodyContent =(
        <div className = "flex flex-col gap-6">
            <Header
                title = "Which of these best describes your item?"
                subtitle= "Pick a category"
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                    "
            >
                {categories.map((item) => (
                    <div key={item.label} className= "col-span-1">
                        <CategoryInput
                            onClick = {(category) => setCustomValue('category', category)}
                            selected = {category == item.label}
                            label = {item.label}
                            icon = {item.icon}
                        />
                    </div>
                ))}

            </div>

        </div>
    )

    if (step === STEPS.LOCATION ){
        bodyContent = (
            <div className= "flex flex-col gap-8">
                <Header
                title="Where is your item located?"
                subtitle="Help renters find you!"
                />
                <SelectCountry
                    value={location}
                    onChange= {(value) => setCustomValue('location', value)}
                />
                
                <Map
                    center={location?.latlng}
                
                />
            </div>
        )
    }
/* 4:15:00 ish BUT IF NEEDED TO IMPLEMENT, GO A FEW MINS BEFORE TO SEE MORE DETAILS
    if(step === STEPS.INFO){
        bodyContent =(
            <div className= "flex flex-col gap-8">
                <Header
                    title = "Share some information about your items"
                    subtitle= "What should renters know about your item?" // no idea what to put here
                />
                <Counter
                    title = "Number of guests"
                    subtitle = "how many guests"
                    value ={guestCount}
                />
            </div>
        )
    }
    */

    if (step === STEPS.IMAGES){
        bodyContent =(
            <div className = "flex flex-col gap-8">
                <Header
                    title = "Add a photo of your item"
                    subtitle= "Show renters what your item looks like!"
                 />
                 <ImageUpload
                    value = {imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION){
        bodyContent =(
            <div className = "flex flex-col gap-8">
                <Header
                    title="How would you describe your item?"
                    subtitle="Provide any & all details a renter would want to know!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if( step === STEPS.PRICE){
        bodyContent=(
            <div className= "flex flex-col gap-8">
                <Header
                    title= "Now, set your price"
                    subtitle="How much do you charge per day?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    
    return ( 
        <Model
            isOpen={rentModel.isOpen}
            onClose={rentModel.onClose}
            onSubmit= {handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction = {step === STEPS.CATEGORY ? undefined : onBack}
            title= "AirBnb your home!"
            body={bodyContent}
        
        />
    );
}

export default RentModel;