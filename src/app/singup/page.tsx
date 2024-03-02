"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        username:"",
        email:"",
        password:""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSingup= async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/singup",user);
            console.log("success : ",response.data);
            router.push("/login");
            
        }
        catch(error:any){
            console.log("error: ",error)
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length >0 && user.password.length > 0 && user.username.length >0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>  {loading ? 'Proceding data ':" Singup"} </h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input 
            className="p-2 border border-gray-900 focus:border-gray-600"
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=> setUser({...user, username:e.target.value})}
            placeholder="Username"
            />
            <label htmlFor="email">email</label>
             <input 
            className="p-2 border border-gray-900 focus:border-gray-600"
            id="email"
            type="email"
            value={user.email}
            onChange={(e)=> setUser({...user, email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>

             <input 
            className="p-2 border border-gray-900 focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=> setUser({...user, password:e.target.value})}
            placeholder="password"
            />
            <button 
            onClick={onSingup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-500"
            >
                {
                    buttonDisabled ? "Fill Details and Singup" : "SignUp"
                }
            </button>
            <Link href="/login">Already Have account LogIn</Link>
        </div>
    );

}