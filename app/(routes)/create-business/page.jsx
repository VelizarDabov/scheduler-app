"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/Firebase";
import { useUser } from "@clerk/nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

const CreateBusiness = () => {
  const [businessName, setBusinessName] = useState();
  const db=getFirestore(app);
  const user = useUser();
  const router = useRouter();
  const onCreateBusiness = async() => {

  
const userEmail = user.user.primaryEmailAddress.emailAddress

   await setDoc(doc(db, 'Business', userEmail), {
    businessName:businessName,
    email:userEmail,
    userName:user.user.fullName

   }).then(resp => {
    toast('New business Created!')
    router.replace('/dashboard')
   })
  };
  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src="/logo.svg" width={200} height={200} alt="logo" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your Business?
        </h2>
        <p className="text-slate-500">
          You can always change this letter from settings
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="EEx. VD"
            className="mt-2"
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>
        <Button onClick={onCreateBusiness} className="w-full">
          Create Business
        </Button>
      </div>
    </div>
  );
};

export default CreateBusiness;
