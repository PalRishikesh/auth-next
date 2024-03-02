"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter();
    const [userId, setUserId] = useState('nothing');
    
    const logoutBtn= async()=>{
        try {

            const response = await axios.get("/api/users/logout");
            console.log("response: ",response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("errr: ",error.message);
            toast.error(error.message);
             
        }
    }

    const getDetail = async()=>{
        const response = await axios.get("/api/users/me");
        console.log("response: ",response.data);
        setUserId(response.data.data._id);

        
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr/>
        <p>Profile Page</p>
        <h2 className="p-1 rounded bg-green-500">
            {
                userId === 'nothing' ? 'No user': <Link href={`/profile/${userId}`}>
                {userId}
                </Link>
            }
        </h2>
        <button 
        onClick={logoutBtn}
        className="bg-blue-800 p-2 rounded mt-4 text-yellow-500">
            LogOut
        </button>

        <button 
        onClick={getDetail}
        className="bg-green-800 p-2 rounded mt-4 text-white">
            Get Detail
        </button>
    </div>
    )
}