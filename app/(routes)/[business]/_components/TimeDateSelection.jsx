import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const TimeDateSelection = ({
  date,
  handleDateChange,
  timeSlots,
  setSelectedTime,
  enableTimesSlot,
}) => {
  return (
    <>
      <div className="md:cols-span-2 flex items-center justify-center px-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Select Date & time</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => handleDateChange(d)}
            className="rounded-md border mt-5"
            disabled={(date) => date <= new Date()}
          />
        </div>
      </div>
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: "400px" }}
      >
        {timeSlots?.map((slot, index) => (
          <Button
            disabled={!enableTimesSlot}
            className="border-primary text-primary"
            variant="outline"
            key={index}
            onClick={() => setSelectedTime(slot)}
          >
            {slot}
          </Button>
        ))}
      </div>
    </>
  );
};

export default TimeDateSelection;
