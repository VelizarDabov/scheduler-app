import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-md">
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="logo"
          className="w-[150px] md:w-[200px]"
        />
        <ul className=" hidden md:flex gap-14 font-medium text-lg ">
          <a href="/dashboard">
          <li className="hover:text-primary transition-all duration-300 cursor-pointer" >Dashboard</li>
          </a>
       
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">Pricing</li>
          {/* <li className="hover:text-primary transition-all duration-300 cursor-pointer">Contact us</li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">About us</li> */}
        </ul>
      <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/"  />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
     
    
    </div>
  );
};

export default Header;
