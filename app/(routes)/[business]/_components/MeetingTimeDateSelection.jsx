"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, formatDate } from "date-fns";
import { CalendarCheck, Clock, MapPin, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeDateSelection from "./TimeDateSelection";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enableTimesSlot, setEnableTimesSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

  //time interval calculation
  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; //8 AM in min
    const endTime = 22 * 60; //10 PM in min
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${period}`;
    });
    setTimeSlots(slots);
  };
  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (businessInfo.daysAvailable?.[day]) {
      setEnableTimesSlot(true);
    } else {
      setEnableTimesSlot(false);
    }
  };
  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-8 lg:mx-20 my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" width={150} height={150} alt="logo" />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting info */}
        <div>
          <h2 className="p-4 border-r">{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType} Meeting
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP")}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <TimerIcon />
                {selectedTime}
              </h2>
            )}

            {eventInfo.locationUrl && (
              <Link className="text-primary" href={eventInfo?.locationUrl}>
                {eventInfo?.locationUrl}
              </Link>
            )}
          </div>
        </div>
        {/* time and date selection */}
        <TimeDateSelection
          date={date}
          enableTimesSlot={enableTimesSlot}
          handleDateChange={handleDateChange}
          setSelectedTime={setSelectedTime}
          selectTime={selectedTime}
          timeSlots={timeSlots}
        />
      </div>
    </div>
  );
};
export default MeetingTimeDateSelection;
