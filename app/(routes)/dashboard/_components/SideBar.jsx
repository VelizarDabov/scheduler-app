'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import menu from "../_constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = () => {
    const path =usePathname();
    const [activePath, setActivePath] = useState(path);

    useEffect(()=> {
setActivePath(path)
    },[path])

  return (
    <div className="p-5 py-14">
      <div className="flex justify-center">
        <Image src="/logo.svg" width={150} height={150} alt="logo" />
      </div>
<Link href={'/create-meeting'}>
<Button className="flex gap-2 w-full rounded-full">
        <Plus /> Create
      </Button>
</Link>
      

      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item) => (
            <Link href={item.path} key={item.id}>
             <Button  className={`w-full flex gap-2 justify-start hover:bg-blue-100 ${activePath === item.path && 'text-primary bg-blue-100'}`} variant='ghost'>
            <item.icon/>{item.name}
          </Button>
            </Link>
         
        ))}
      </div>
    </div>
  );
};

export default SideBar;
