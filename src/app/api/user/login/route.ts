import { PrismaClient } from "@prisma/client";
import { signJwtAccessToken } from "@/lib/jwt";
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
        const {password,...userWithoutpass}=user
        const accessToken=signJwtAccessToken(userWithoutpass)
        const result={
            ...userWithoutpass,
            accessToken
        }
        return new Response(JSON.stringify(result))
     }else return new Response(JSON.stringify(null))
}