"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function ForgotpasswordPage(){
    const router = useRouter();

    const [token, setToken ] = useState("nothing");
    const [user, setUser]= useState({
        password:"",
        confirmPassword:""
    })

    const setForgotPassword = async()=>{
        try{
            const forgotPasswordResponse = await axios.post("/api/users/forgotpassword",{
                token:token, userDetail : user
            });
            router.push("/login")
        }
        catch(error:any){
            console.log("error: ",error.message);
            
        }

        


    }

    const resetPassword=()=>{
        console.log("some: ",user)
        setForgotPassword();
    }

    useEffect(()=>{
        const tokenData = window.location.search.split("=")[1];
        setToken(tokenData || "");
    },[])




    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2>Forgot Password Page</h2>
            <hr/>
            
            <label htmlFor="password">Password</label>
            <div>
            <input
            type="password"
            value={user.password}
            placeholder="Enter Password"
            className="p-2"
            onChange={(e)=>setUser({...user, password: e.target.value})}
            />
            </div>
             <label htmlFor="confirmPassword">Confirm Password</label>
             <div>
                <input
            type="password"
            value={user.confirmPassword}
            placeholder="Enter Confirm Password"
            className="p-2"
            onChange={(e)=>setUser({...user, confirmPassword: e.target.value})}
            />
            </div>
            <button 
            onClick={resetPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-500"
            >
              Set Password
            </button>
        </div>
    );
}