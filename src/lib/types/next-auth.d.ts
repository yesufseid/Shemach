import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            id:Number,
            email:string,
            firstname:string,
            lastname:string,
            accessToken:string
           
        }
    }
}