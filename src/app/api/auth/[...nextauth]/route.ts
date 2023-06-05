
import { Session } from "inspector"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { redirect } from "next/dist/server/api-utils"


const handler= NextAuth({
      providers: [
          CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "seidyesuf750@gmail.com" },
              password: { label: "Password", type: "password" },
              updatepassword:{label:"forgetpassword",type:"button"}

            },
            async authorize(credentials, req) {

              console.log(credentials);
              if(credentials.updatepassword==="true"){
              
              }
              
               const res = await fetch("http://localhost:3000/api/user/login", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
             // If no error and we have user data, return it
              if (user) {
                
                return user
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
        ],
        pages:{
          signIn:"/api/auth/signIn",
        },
        callbacks:{
          async jwt({token,user}){
            return {...token,...user}
          },
          async session({session,token}){
            session.user=token as any
            return session ;
          },
        }
      })
      





    

export {handler as GET,handler as POST}

 
