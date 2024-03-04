"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function ForgotpasswordPage(){
    const router = useRouter();

    const [email, setEmail]= useState("")

    const setForgotPassword= async()=>{
        try{
            const forgotPasswordResponse = await axios.post("/api/users/sendForgotpassword",{
                email
            });
            router.push("/login")
        }
        catch(error:any){
            console.log("error: ",error.message);
            
        }

        


    }

  






    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2>Forgot Password  Link</h2>
            <hr/>
            
            <label htmlFor="email">email</label>
            <div>
            <input
            type="email"
            value={email}
            placeholder="Enter email Id"
            className="p-2"
            onChange={(e)=>setEmail(e.target.value)}
            />
            </div>
         
            <button 
            onClick={setForgotPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-500"
            >
              Send Link
            </button>
        </div>
    );
}