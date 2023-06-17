 'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
 const [email,setEmail]=useState("")

 const Submit=async()=>{
   
   const res=await fetch("/updatePassword/api",{
    method: 'POST',
    body: JSON.stringify({
      email:email
    }),
    headers: {
    "Content-Type": "application/json",
   }
   })
   if(res.status===200){
    const notify = () => toast("updated");
    return notify()

  }
   if(res.status===401){
    const notify = () => toast("user does not exist!");
    return notify()
  }
 }


  return (
    <section className='pt-24 container items-center h- bg-black'>
       <div className='text-center shadow-black  w-[400px]'>
        <form action="#" onSubmit={Submit}>
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
            <input type="text" id="first_name" onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-fit p-2" placeholder="shemach@gmail.co" required/>
        </div>
        <button type="submit" className="text-white  border rounded-md hover:bg-transparent px-4 py-3 mt-5">Submit</button>
        </form>
       </div>
       <ToastContainer />
    </section>
  )
}

export default page