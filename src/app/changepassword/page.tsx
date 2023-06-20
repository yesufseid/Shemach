'use client'
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const page = () => {
    const {data:session}=useSession()
 const [password,setPassword]=useState('')
 const [newpassword,setnewPassword]=useState('')
 const [required,setRequired]=useState(false)
 
const handler=({target})=>{
   setRequired(false)
   return setPassword(target.value)
}
const newHandler=({target})=>{
    setRequired(false)
    return setnewPassword(target.value)
 }



 const Submit=async(e:FormEvent)=>{
  e.preventDefault
  if(password===""){
    return  setRequired(true)
  }
  if(newpassword===""){
    return  setRequired(true)
  }
   const res=await fetch("/changepassword/api",{
    method: 'POST',
    body: JSON.stringify({
      password:password,
      newpassword:newpassword,
      email:session?.user.email,
    }),
    headers: {
    "Content-Type": "application/json",
   }
   })
   if(res.ok){
    const notify = () => toast("updated");
    return notify()

  }
   if(!res.ok){
    const notify = () => toast("wrong password!");
    return notify()
  }
 }

  return ( <div className='grid items-center h-screen  justify-items-center '>
    <div className='w-[500px] shadow-2xl px-4 py-5'>
        <h1 className='py-3 font-semibold text-center'>change your password</h1>
            <div>
                <h1 className='py-2 font-semibold '>Name  {session?.user?(session?.user.firstname+(" ")+session?.user.lastname):null}</h1>
            </div>
            <div className='mt-3 block'>
              <label htmlFor="username" className='text-base mb-5  '>password</label>
              <input type="text"  id="username" onChange={handler}
              className='border w-full rounded-md text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'/>
            </div>
            <div className='mt-3 block'>
              <label htmlFor="username" className='text-base mb-5  '>new password</label>
              <input type="text"  id="username" onChange={newHandler}
              className='border w-full rounded-md text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'/>
              {required?(<label htmlFor="username" className='text-base mb-5  text-red-500 '> all are required!</label>):null}
            </div>
              <div className='mt-5'>
                 <button type='submit' onClick={Submit}  className='border  bg-indigo-700 text-white py-1 w-full 
                 rounded-md hover:bg-transparent hover:text-indigo-700 font-bold'>Submit</button>
              </div> 
             
       </div>
       <ToastContainer />
      </div>
      )
}

export default page