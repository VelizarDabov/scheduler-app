"use client";
import { app } from "@/config/Firebase";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const MeetingEventList = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    user && getEventList();
  }, [user]);
  const getEventList = async () => {
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.primaryEmailAddress.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEventList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList?.map((event, index) => (
        <div key={index} className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3" >
          <h2 className="font-medium text-2xl">{event?.eventName}</h2>
          <div className="flex justify-between">
            <h2>
              <Clock />
              {event.duration}
            </h2>
            <h2>
                <MapPin/>{event.locationType}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingEventList;
