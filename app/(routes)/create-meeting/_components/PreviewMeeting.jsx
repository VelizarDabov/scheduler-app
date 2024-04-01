'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PreviewMeeting = ({formData}) => {
    const [date, setDate]=useState(new Date());
const [timeSlots, setTimeSlots] = useState()
    useEffect(() => {
        formData?.duration&&createTimeSlot(formData?.duration)
    },[formData])

    //time interval calculation
    const createTimeSlot=(interval)=>{
        const startTime = 8 * 60 //8 AM in min 
        const endTime=22 * 60 //10 PM in min
        const totalSlots=(endTime-startTime)/interval;
        const slots = Array.from({length:totalSlots}, (_,i)=> {
            const totalMinutes=startTime + i * interval;
            const hours=Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60
            const formattedHours=hours > 12 ? hours - 12 : hours;
            const period=hours >= 12 ? 'PM': 'AM'
            return `${String(formattedHours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${period}`
        })
  setTimeSlots(slots)
    }
  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8' style={{borderTopColor:formData?.themeColor}}>
       <Image src='/logo.svg' width={150} height={150} alt='logo'/>
       <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
        {/* Meeting info */}
        <div>
<h2 className='p-4 border-r'>Business Name</h2>
<h2 className='font-bold text-2xl'>{formData?.eventName?formData?.eventName:'Meeting Name'}</h2>
<div className='mt-5 flex flex-col gap-4'>
    <h2 className='flex gap-2'><Clock />{formData?.duration} Min</h2>
<h2 className='flex gap-2'><MapPin />{formData?.locationType} Meeting</h2>
{formData.locationUrl &&(<Link className='text-primary' href={formData?.locationUrl}>{formData?.locationUrl}</Link>)}

</div>
        </div>
        {/* time and date selection */}
        <div className='md:cols-span-2 flex px-4'>
       <div className='flex flex-col'>
        <h2 className='font-bold text-lg'>Select Date & time</h2>
       <Calendar
     mode="single"
     selected={date}
     onSelect={setDate}
     className="rounded-md border mt-5"
     disabled={(date)=> date <= new Date()}
   />
 
       </div>

        </div>
        <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{maxHeight:'400px'}}>
  {timeSlots?.map((slot, index)=> (
    <Button className='border-primary text-primary' variant='outline' key={index}>{slot}</Button>
 ))}
  </div>
       </div>
    </div>
  )
}

export default PreviewMeeting

