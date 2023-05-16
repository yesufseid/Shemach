import { PrismaClient } from "@prisma/client";
import { verifyjwt } from "@/lib/jwt";
const prisma=new PrismaClient()
import bcrypt from "bcrypt";

interface Reaqustbody{
    email:string,
    firstname:string,
    lastname:string,
    password:string,
}



export async function POST(request:Request){
   const accessToken=request.headers.get("authorization")
   if(!accessToken ||!verifyjwt(accessToken)){
      return new Response(JSON.stringify({
        error:"unathorized"
        
      }),{
        status:401
      })
   }

    const body:Reaqustbody=await request.json()
    const user=await prisma.user.create({
        data:{
            email:body.email,
            firstname:body.firstname,
            lastname:body.lastname,
            password:await bcrypt.hash(body.password,10)
        }
    })

if(user){
    const {password,...result}=user;
    return new Response(JSON.stringify(result))
}else return new Response(JSON.stringify(null))


}