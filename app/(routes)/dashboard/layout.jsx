
import React from 'react'
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'

const DashboardLayout = ({children}) => {
    
  return (
    <div>
        <div className='hidden md:block md:w-64 bg-slate-100 h-screen fixed'>
            <SideBar />
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout