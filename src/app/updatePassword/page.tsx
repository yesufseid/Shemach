 'use client'
import React, { FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const page = () => {
 const [email,setEmail]=useState("")
 const [required,setRequired]=useState(false)
 
const handler=({target})=>{
   setRequired(false)
   return setEmail(target.value)
}




 const Submit=async(e:FormEvent)=>{
  e.preventDefault
  if(email===""){
    return  setRequired(true)
  }
   const res=await fetch("/updatePassword/api",{
    method: 'POST',
    body: JSON.stringify({
      email:email
    }),
    headers: {
    "Content-Type": "application/json",
   }
   })
   console.log(res);
   
   if(res.ok){
    const notify = () => toast("updated");
    return notify()

  }
   if(!res.ok){
    const notify = () => toast("user does not exist!");
    return notify()
  }
 }


  return ( <div className='grid items-center h-screen  justify-items-center '>
    <div className='w-[500px] shadow-2xl px-4 py-5'>
            
            <div className='mt-3 block'>
              <label htmlFor="username" className='text-base mb-5  '>username</label>
              <input type="text"  id="username" onChange={handler}
              className='border w-full rounded-md text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'/>
              {required?(<label htmlFor="username" className='text-base mb-5  text-red-500 '>required!</label>):null}
            </div>
              <div className='mt-5'>
                 <button type='submit' onClick={Submit}  className='border  bg-indigo-700 text-white py-1 w-full 
                 rounded-md hover:bg-transparent hover:text-indigo-700 font-bold'>LogIn</button>
              </div> 
             
       </div>
       <ToastContainer />
      </div>
      )
}

export default page