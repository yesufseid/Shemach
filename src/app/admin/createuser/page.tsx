'use client'
import React,{FormEvent, useState} from 'react'
import {useSession} from 'next-auth/react'
import { AuthRequiredError } from '@/lib/exceptions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import {signIn,signOut} from 'next-auth/react'




const page = ()=> {
  const {data:session}=useSession()

  
  if(session && session.user.role!=="ADMIN"){
    return notFound()
  }else{
  const [firstname,setFirstname]=useState("")
  const [lastname,setLastname]=useState("")
  const [email,setEmail]=useState("")
 const [allrequired,setAllrequired]=useState(false)


const firstnameHendler=({target})=>{
  setAllrequired(false)
  setFirstname(target.value)
}
const lastnameHendler=({target})=>{
  setAllrequired(false)
  setLastname(target.value)
}
const emailHendler=({target})=>{
  setAllrequired(false)
  setEmail(target.value)
}

 const Submit=async(e)=>{
  e.preventDefault
 if (firstname==="" || lastname === "" || email ==="" ){ 
  setAllrequired(true)
} else {
  try {
    const res=await fetch("/api/admin/createuser",{
      method: 'POST',
      body: JSON.stringify({
        firstname:firstname,
        lastname:lastname,
        email:email
      }),
      headers: {
      "Content-Type": "application/json",
      "authorization":session.user.accessToken
     }
    })
    if(res.status===200){
      const notify = () => toast("user created");
      return notify()
    }
    if (!res.ok) {
      if(res.status===401){
        
           return signIn()
        // return redirect('/api/auth/signin')
      } 
      if(res.status===500){
        const notify = () => toast("user aready exist!");
        return notify()

      }
      if(res.status===402){
        const notify = () => toast("email not found");
        return notify()
      }

    }
  }catch(error){
   throw Error('Failed to fetch data');
  } 
    }
} 


  return (
    <div className=' grid items-center h-screen  justify-items-center place-content-center bg-slate-400 '>
      <div className='w-[450px] shadow-2xl py-5 px-7 shadow-indigo-500/40' >
        <h1 className='font-semibold text-2xl text-center py-2 my-2'>create user</h1>        
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium">frist name</label>
    <input onChange={firstnameHendler} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
  </div>
  <div className="mb-6">
    <label htmlFor="lastname" className="block mb-2 text-sm font-medium">last name</label>
    <input onChange={lastnameHendler} type="text" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <div className="mb-6">
    <label  htmlFor="email" className="block mb-2 text-sm font-medium">email</label>
    <input onChange={emailHendler} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@shemach.com" required />
  </div>
   <button onClick={Submit} type="submit" className="text-white ml-[150px] px-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>  
   {allrequired?( <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-600"> all are required!</label>):(<></>)}
      </div>
      <ToastContainer />
      </div>
  )
}
}

export default page