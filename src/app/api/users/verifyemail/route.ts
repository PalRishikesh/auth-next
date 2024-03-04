import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import {NextRequest,NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("token : ",token);
        const user = await User.findOne({
            verifyToken:token, 
            verifyTokenExpiry:{$gt: Date.now()}
        });
        if(!user){
            return NextResponse.json({
                message:"Invalid token"
            },{status:400})
        }
        console.log(user);
        // use user refernce of above
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
         await user.save();

      
        return NextResponse.json({
            message:"Email verified succesfully",
            success:true
        })

        
        

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:400})
    }
    
}