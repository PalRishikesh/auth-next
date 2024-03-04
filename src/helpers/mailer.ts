import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any)=>{
    try {
        //Hash token
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 360000
            })
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswrodToken:hashedToken,
                forgotPasswrodTokenExpiry:Date.now() + 360000
            })
        }
        // Send mail
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4a0438f52153f5",
              pass: "4e19393f953c17"
            }
          });

          const mailOptions = {
            from:'RishiPal@gmail.com',
            to:email,
            subject:emailType === 'VERIFY' ? 'Verify your email':'Reset your password',
            html:`<p>Click <a href="${process.env.DOMAIN}/${ emailType === 'VERIFY'?'verifyemail' : 'forgotpassword'}?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY' ?'Verify your email ':'Reset your password'}</p>`
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}