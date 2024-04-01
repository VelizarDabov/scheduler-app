"use client";
import React, { useEffect, useState } from "react";
import DaysList from "../../create-meeting/_utils/DaysList";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/config/Firebase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState(
    { Sunday: false },
    { Monday: false },
    { Tuesday: false },
    { Wednesday: false },
    { Thursday: false },
    { Friday: false },
    { Saturday: false }
  );
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const db = getFirestore(app);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress.emailAddress;

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", userEmail);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setDaysAvailable(result.daysAvailable);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  };
  const onHandleChange = (day, e) => {
    setDaysAvailable({ ...daysAvailable, [day]: e });
  };
  const handleSave = async () => {
    const docRef = doc(db, "Business", userEmail);
    await updateDoc(docRef, {
      daysAvailable: daysAvailable,
      startTime: startTime,
      endTime: endTime,
    }).then((resp) => {
      toast("Changes Updated !");
    });
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7"></hr>
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, index) => (
            <div key={index}>
              <h2>
                <Checkbox
                  checked={
                    daysAvailable[item.day] ? daysAvailable[item.day] : false
                  }
                  className="mr-1"
                  onCheckedChange={(e) => onHandleChange(item.day, e)}
                />
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <h2 className="font-bold mt-10">Availability Time</h2>
      <div className="flex gap-10">
        <div className="mt-3">
          <h2>Start Time</h2>
          <Input
            type="time"
            defaultValue={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h2>End Time</h2>
          <Input
            type="time"
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Availability;
