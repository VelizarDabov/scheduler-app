import { Input } from "@/components/ui/input";
import React from "react";

const UserFormInfo = ({setUserEmail,setUserName,setUserNote}) => {
  return (
    <div className="p-4 px-8 flex flex-col gap-3">
      <h2 className="font-bold text-xl">Enter Details</h2>
      <div>
        <h2>Name*</h2>
        <Input onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <h2>Email*</h2>
        <Input onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div>
        <h2>Share Any Notes</h2>
        <Input onChange={(e) => setUserNote(e.target.value)} />
      </div>
      <div>
        <h2 className="text-xs text-gray-400">
          By Proceeding, you confirm that you read and agree VND terms and
          conditions
        </h2>
      </div>
    </div>
  );
};

export default UserFormInfo;
