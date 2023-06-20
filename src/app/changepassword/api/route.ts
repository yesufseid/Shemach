import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient() 
import bcrypt from "bcrypt";


interface Reaqustbody{
    password:string
    newpassword:string
    email:string
}

export async function POST(request:Request){
 const body:Reaqustbody=await request.json()
 const user= await prisma.user.findFirst({
    where:{
        email:body.email
    }
  }) 
if(user &&  (await bcrypt.compare(body.password,user.password))) {
    try {
        const user=await prisma.user.update({
               where:{
                   email:body.email
               }
           ,
       data:{
           password:await bcrypt.hash(body.newpassword,10)
       }})
       if(user){
        return   new Response(JSON.stringify(user))
       }
         
      
      } catch (error) {
       console.log(error);
       
       return new Response(JSON.stringify({
           Error:'the user aurady exist'
          }),{
            status:401
          })
       }
   }
   
new Response(JSON.stringify({
    Error:'the user aurady exist'
   }),{
     status:401
   })

  
}