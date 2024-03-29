'use client'
import React, { useState } from 'react'
import MeetingForm from './_components/MeetingForm'

const CreateMeeting = () => {
    const [formData, setFormData]=useState()
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {/* Meeting form */}
        <div className='shadow-md border h-screen'>
<MeetingForm setFormValue={(e)=> setFormData(e)}/>
        </div>
{/* Preview */}
<div className='hidden md:col-span-2 '>

</div>
    </div>
  )
}

export default CreateMeeting