'use client'
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/Firebase";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const user = useUser();
const router = useRouter();

    useEffect(() => {
        if (user && user.isSignedIn) {
            isBusinessRegistered();
        }
    }, [user]);
    // Initialize Firestore after app initialization
    const db = getFirestore(app);
    const isBusinessRegistered = async () => {
        try {
            const docRef = (doc(db, "Business",  user.user.primaryEmailAddress.emailAddress)); // Assuming user.id is the document ID
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log('Document data:', docSnap.data());
                setLoading(false)
            } else {
                console.log('No such document');
                setLoading(false)
                router.replace('/create-business')
            }
        } catch (error) {
            console.error('Error checking if business is registered:', error);
        }
    };
if(loading){
    return(<h2>Loading..</h2>)
}
    return (
        <div>
            Dashboard
            <UserButton />
        </div>
    );
};

export default Dashboard;