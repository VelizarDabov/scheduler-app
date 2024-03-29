'use client'
import React, { useState } from 'react'
import MeetingForm from './_components/MeetingForm'
import PreviewMeeting from './_components/PreviewMeeting'

const CreateMeeting = () => {
    const [formData, setFormData]=useState({})
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {/* Meeting form */}
        <div className='shadow-md border h-screen'>
<MeetingForm setFormValue={(e)=>  setFormData(e)}/>
        </div>
{/* Preview */}
<div className='md:col-span-2'>
<PreviewMeeting formData={formData}/>
</div>
    </div>
  )
}

export default CreateMeeting