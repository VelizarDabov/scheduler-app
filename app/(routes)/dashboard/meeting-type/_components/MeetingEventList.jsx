"use client";
import { Button } from "@/components/ui/button";
import { app } from "@/config/Firebase";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MeetingEventList = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState([]);
  useEffect(() => {
    user && getEventList();
    user && BusinessInfo();
  }, [user]);
  const getEventList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.primaryEmailAddress.emailAddress),
      orderBy("id", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEventList((prev) => [...prev, doc.data()]);
    });
  };
  const onCopyClickHandler = (event) => {
    const meeting =
      process.env.NEXT_PUBLIC_BASE_URL +
      businessInfo.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meeting);
    toast("Copied to Clipboard");
  };
  const onDeleteEvent = async (event) => {
    if (!event || !event.id) {
      console.error("Event or event ID is undefined");
      return;
    }

    try {
      await deleteDoc(doc(db, "MeetingEvent", event.id));
      getEventList();
      toast("Event Deleted!");
    } catch (error) {
      console.error("Error deleting event:", error);
      // Handle the error appropriately, e.g., show an error message
    }
  };
  const BusinessInfo = async () => {
    const docRef = doc(db, "Business", user?.primaryEmailAddress.emailAddress);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  };
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList.length > 0 ? (
        eventList?.map((event, index) => (
          <div
            key={index}
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2">
                    <Pen />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => onDeleteEvent(event)}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-2xl">{event?.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2 text-gray-500">
                <Clock />
                {event.duration}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin />
                {event.locationType}
              </h2>
            </div>
            <hr></hr>
            <div className="flex justify-between text-primary">
              <h2
                className="flex items-center text-primary gap-2  text-sm cursor-pointer "
                onClick={() => {
                  onCopyClickHandler(event);
                }}
              >
                <Copy className="h-4 w-4 " /> Copy Link
              </h2>
              <Button
                variant="outline"
                className="border-primary rounded-full text-primary text-sm"
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
