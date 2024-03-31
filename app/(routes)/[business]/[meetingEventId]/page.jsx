"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/Firebase";

const ShareMeetingEvent = ({ params }) => {
  const [businessInfo, setBusinessInfo] = useState();
  const [eventInfo, setEventInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  useEffect(() => {
    params && getMeetingBusinessAndEventDetails();
  }, [params]);
  const getMeetingBusinessAndEventDetails = async () => {
    setLoading(true);
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", params?.business)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      setBusinessInfo(doc.data());
    });
    const docRef = doc(db, "MeetingEvent", params.meetingEventId);
    const result = await getDoc(docRef);
    console.log(result.data());
    setEventInfo(result.data());
    setLoading(false);
  };
  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={eventInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default ShareMeetingEvent;