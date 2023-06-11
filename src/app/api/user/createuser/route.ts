import { PrismaClient } from "@prisma/client";
import { verifyjwt } from "@/lib/jwt";
const prisma=new PrismaClient()
import bcrypt from "bcrypt";
import Nodemailer from "nodemailer"


interface Reaqustbody{
    email:string,
    firstname:string,
    lastname:string,
}
 

export async function POST(request:Request){
   const accessToken=request.headers.get("authorization")
   console.log("user"+ accessToken);
   if(!accessToken ||!verifyjwt(accessToken)){
    console.log("user"+ accessToken);
    
      return new Response(JSON.stringify({
        error:"unathorized"
        
      }),{
        status:401
      })
   }
const body:Reaqustbody=await request.json()
const user=await prisma.user.findUnique({
  where:{
    email:body.email
  }
})

if(user){return  new Response(JSON.stringify({
  error:"user already exist"
  
}),{
  status:401
})}

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