import { UserButton} from '@clerk/nextjs'
import { ChevronDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const DashboardHeader = () => {

  return (
    <div className='p-4 px-10'>
        <div className='flex items-center float-right'>
        <UserButton/>
       
       
        <DropdownMenu>
  <DropdownMenuTrigger> <ChevronDown /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
    </div>
  )
}

export default DashboardHeader