import { Sidebar } from 'lucide-react'
import React from 'react'
import SideBar from './_components/SideBar'

const DashboardLayout = ({children}) => {
    
  return (
    <div>
        <div className='hidden md:block md:w-64 bg-slate-400 h-screen fixed'>
            <SideBar />
        </div>
        <div className='md:ml-64'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout