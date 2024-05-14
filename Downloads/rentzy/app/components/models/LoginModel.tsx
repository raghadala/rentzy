'use client';
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
//import { toast } from "react-hot-toast";

import { 
    FieldValues, 
    SubmitHandler,
    useForm
  } from "react-hook-form";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import Model from "./Model";
import Header from "../Header";
import Input from "../inputs/Input";
import toast from "@/node_modules/react-hot-toast/dist/index";
import Button from "../Button";
import useLoginModel from '@/app/hooks/useLoginModel';
import { useRouter } from "next/navigation";

const LoginModel = () => {
    const router = useRouter();

    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();

    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
    } = useForm <FieldValues> ({
        defaultValues: {
            email: '',
            password: ''
          }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect:false
        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModel.onClose();
            }
            if (callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
      loginModel.onClose();
      registerModel.onOpen();
    },[loginModel, registerModel]);

    
    const bodyContent =(
        <div className = "flex flex-col gap-4">
            <Header 
                title="Welcome back"
                subtitle="Log in your account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline 
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
        <div
          className="
            text-neutral-500
            text-center
            mt-4
            font-light
            "
        >
        <div className="
          justify-center flex flex-row items-center gap-2">
          <div>
            First time using Rentzy?
          </div>
          <div
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
              "
          >
              Create an account
            </div>
          </div>
        </div>
      </div>

      )

    return (
        <Model
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Log in"
            actionLabel="Continue"
            onClose={loginModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );


}
export default LoginModel;