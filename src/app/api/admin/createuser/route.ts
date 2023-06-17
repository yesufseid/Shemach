import { PrismaClient } from "@prisma/client";
import { verifyjwt } from "@/lib/jwt";
const prisma=new PrismaClient()
import bcrypt from "bcrypt";
import Nodemailer from "nodemailer"
import { NextResponse } from "next/server";
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Create User',
  description: 'this is create user page',
}



interface Reaqustbody{
    email:string,
    firstname:string,
    lastname:string,
}
 

export async function POST(request:Request){
   const accessToken=request.headers.get("authorization")
   const body:Reaqustbody=await request.json()
if(!accessToken || !verifyjwt(accessToken)){
    console.log("user" + accessToken)
   
      return new Response(JSON.stringify({
        error:"unathorized"
        
      }),{
        status:401
      })
   }



const user=await prisma.user.findUnique({
  where:{
    email:body.email
  }
})
if(user){ 
 return new Response(JSON.stringify( {
  Error:'the user aurady exist'
 }),{
   status:500
 })

}else{
 
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
      console.log(info);
      
      if(!info){
        return new Response(JSON.stringify( {
          Error:'the user aurady exist'
         }),{
           status:402
         })
      }
      if(info){
        const user=await prisma.user.create({
            data:{
                email:body.email,
                firstname:body.firstname,
                lastname:body.lastname,
                password:await bcrypt.hash(Random_password,10)
            }
        })
    
    if(user){
        const {password,...result}=user;
        return new Response(JSON.stringify(result))
    }else return new Response(JSON.stringify(null))
      }
}


    // }

}