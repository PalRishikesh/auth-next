import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import {NextRequest,NextResponse } from 'next/server';

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email } = reqBody;
        const user = await User.findOne({
            email
        });
       
         // Send email
         await sendEmail({ email, emailType:"RESET", userId: user._id });
        return NextResponse.json({
            message:"Password verifed successfully",
            success:true
        })

    }
    catch(error:any){
        return NextResponse.json({
            error:error.message
        },{status:400})
    }
}