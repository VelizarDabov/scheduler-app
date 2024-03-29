import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import menu from "../_constants";
import Link from "next/link";
const SideBar = () => {
  return (
    <div className="p-5 py-14">
      <div className="flex justify-center">
        <Image src="/logo.svg" width={150} height={150} alt="logo" />
      </div>

      <Button className="flex gap-2 w-full rounded-full">
        <Plus /> Create
      </Button>

      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item, index) => (
            <Link href={item.path}>
             <Button key={item.id} className='w-full flex gap-2 justify-start hover:bg-blue-100' variant='ghost'>
            <item.icon/>{item.name}
          </Button>
            </Link>
         
        ))}
      </div>
    </div>
  );
};

export default SideBar;
