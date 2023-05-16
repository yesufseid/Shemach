import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma=new PrismaClient()

interface Reaqustbody {
    username:string
    password:string
}

export async function POST(request:Request){
     const body:Reaqustbody=await request.json()
     const user=await prisma.user.findFirst({
        where:{
            email:body.username
        }
     })

     if(user && (await bcrypt.compare(body.password,user.password))){
        return new Response(JSON.stringify(user))
     }else return new Response(JSON.stringify(null))
}