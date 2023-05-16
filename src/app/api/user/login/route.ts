import { PrismaClient } from "@prisma/client";
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

     if(user && user.password===body.password){
        return new Response(JSON.stringify(user))
     }else return new Response(JSON.stringify(null))
}