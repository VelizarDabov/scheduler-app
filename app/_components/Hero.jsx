import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center my-20">
        <div className="hidden lg:block">
            <Image src='/man.png' width={100} height={100} className="h-[100px] object-cover rounded-full absolute right-20"/>
            <Image src='/woman.png' width={100} height={100} className="h-[100px] object-cover rounded-full absolute top-48 left-16"/>
            <Image src='/man.png' width={100} height={100} className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"/>
            <Image src='/woman.png' width={100} height={100} className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"/>
        </div>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-bold text-[60px] text-slate-700">
          Easy scheduling ahead
        </h2>
        <h2 className="text-xl mt-5 text-slate-500">
          Scheduly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time - and so much more.
        </h2>
        <div className="flex gap-4 flex-col mt-6 font-bold">
          <h3 className="text-sm">Sign Up free with Google and Facebook</h3>
        </div>
        <div className="flex justify-center gap-5 mt-2">
          <Button className='p-7 flex gap-4'> 
            <Image src='/google.png' width={40} height={40} alt="Google"/>Sign up with Google</Button>
          <Button className='p-7 flex gap-4'> <Image src='/facebook.png' width={40} height={40} alt="Facebook"/>Sign up with Facebook</Button>
        </div>
        <hr className="mt-3"></hr>
        <h2 className="mt-3">
          {" "}
          <Link href="" className="text-primary">
            Sign up Free with Email.
          </Link>{' '}
          No Credit card required
        </h2>
      </div>
    </div>
  );
};

export default Hero;
