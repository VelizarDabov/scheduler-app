"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOptions from "../_utils/LocationOptions";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeOptions from "../_utils/ThemeOptions";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/Firebase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MeetingForm = ({ setFormValue }) => {
  const [themeColor, setThemeColor] = useState();
  const [eventName, setEventName] = useState();
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState();
  const [locationUrl, setLocationUrl] = useState();
  const { user } = useUser();
const router=useRouter()
  const db = getFirestore(app);
  useEffect(() => {
    setFormValue({
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
    });
  }, [eventName, duration, locationType, locationUrl, themeColor]);

  const onCreateClick = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      id: id,
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
      businessid: doc(db, "Business", user?.primaryEmailAddress.emailAddress),
      createdBy:user?.primaryEmailAddress.emailAddress,
    }).then((resp) => {
      toast("New Meeting Event Created!");
      router.replace('/dashboard/meeting-type')
    });
  };
  return (
    <div className="p-8">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          {" "}
          <ChevronLeft /> Cancel
        </h2>
      </Link>

      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event name *</h2>
        <Input
          placeholder="Name of your Meeting"
          onChange={(event) => setEventName(event.target.value)}
        />
        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {" "}
              {duration}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2 className="font-bold">Location * </h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOptions.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col justify-center items-center p-3 rounded-lg hover:bg-blue-100 hover:border-primary ${
                locationType === option.name && "bg-blue-100 border-primary"
              }`}
              onClick={() => setLocationType(option.name)}
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        <div>
          {locationType && (
            <>
              <h2 className="font-bold ">Add {locationType}</h2>
              <Input
                placeholder="Add URL"
                className="mb-2"
                onChange={(event) => setLocationUrl(event.target.value)}
              />
            </>
          )}
          <h2 className="font-bold ">Select Theme Color</h2>
          <div className="flex justify-evenly ">
            {ThemeOptions.map((color, index) => (
              <div
                key={index}
                className={`w-7 h-7 rounded-full mt-2 cursor-pointer ${
                  themeColor === color && " border-4 border-black/50"
                } `}
                style={{ backgroundColor: color }}
                onClick={() => setThemeColor(color)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <Button
        disabled={!eventName || !duration || !locationType || !locationUrl}
        className="w-full  mt-9"
        onClick={() => onCreateClick()}
      >
        Create
      </Button>
    </div>
  );
};

export default MeetingForm;
