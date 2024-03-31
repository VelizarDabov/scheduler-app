'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledMeetingList from './_components/ScheduledMeetingList'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/Firebase'
import { useUser } from "@clerk/nextjs";
import { useEffect } from 'react'
import { useState } from 'react'
import { format } from 'date-fns'

const ScheduledMeetings = () => {
    const db = getFirestore(app)
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress.emailAddress;
const [meetingList, setMeetingList]=useState([])
    useEffect(()=> {
user&&getScheduledMeetings()
    },[user])
    const getScheduledMeetings=async()=> {
        const q = query(collection(db, 'ScheduledMeetings'), where('businessEmail', '==',userEmail))
        const querySnapshot=await getDocs(q)
        querySnapshot.forEach(doc=> {
           setMeetingList(prev=>[...prev, doc.data()])
        })
    }
    const filterMeetingList=(type)=> {
        if(type=='upcoming'){
           return meetingList.filter(item=>item.formatedTimeStamp >= format(new Date(), 't'))
        }
    }
  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>ScheduledMeetings</h2>
        <hr className='my-5'></hr>
        <Tabs defaultValue="upcomming" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="upcomming">Upcomming</TabsTrigger>
    <TabsTrigger value="expired">Expired</TabsTrigger>
  </TabsList>
  <TabsContent value="upcomming">
    <ScheduledMeetingList meetingList={filterMeetingList('upcoming')} />
    
  </TabsContent>
  <TabsContent value="expired">Change your expired here.</TabsContent>
</Tabs>

    </div>
  )
}

export default ScheduledMeetings