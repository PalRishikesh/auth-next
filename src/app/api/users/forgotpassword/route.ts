import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs  from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, userDetail } = reqBody;
        const user = await User.findOne({
            forgotPasswrodToken: token
        });
        if (!user) {
            return NextResponse.json({
                message: "Invalid Token"
            }, { status: 400 })
        }
    
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(userDetail.password, salt)
        user.forgotPasswrodToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password verifed successfully",
            success: true
        })

    }
    catch (error: any) {
        console.log("errr: ", error);

        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}