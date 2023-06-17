import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient() 
import bcrypt from "bcrypt";
import Nodemailer from "nodemailer"

interface Reaqustbody{
    email:string
}

export async function POST(request:Request){
   const body:Reaqustbody=await request.json()
   

   try {
    const Random_password=Math.floor(Math.random() * 10000).toString();
   console.log(Random_password)
    const transporter = Nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"seid yesuf👻" <seidyesuf750@gmail.com>', // sender address
        to:body.email, // list of receivers
        subject:"hellow", // Subject line
        text:Random_password, // plain text body
    
      });

      if(info){
        const user=await prisma.user.update({
            where:{
                email:body.email
            }
        ,
    data:{
        password:await bcrypt.hash(Random_password,10)
    }})
    if(user){
        return new Response(JSON.stringify(user))
    }
      }
   
   } catch (error) {
    return new Response(JSON.stringify( {
        Error:'the user aurady exist'
       }),{
         status:401
       })
   }
}