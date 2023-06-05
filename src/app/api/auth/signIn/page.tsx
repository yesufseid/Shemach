"use client"
import React,{useRef} from 'react'
import {signIn } from 'next-auth/react';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'LogIn',
  
};
 
 
export default function page() {
const userName=useRef("")
const pass=useRef("")

const upDate=(()=>{
  const result=signIn("credentials",{
    updatepassword:"true"
  })
})


const onSubmit=(()=>{
    const result= signIn("credentials",{
        username:userName.current,
        password:pass.current,
        redirect:true,
        callbackUrl:"/"
    })
})




  return (
    <div className='flex justify-center items-center h-screen bg-indigo-600'>
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
           <h1 className='text-3xl  block text-center font-semibold'><i className="fa-solid fa-user"></i>LogIn</h1>
           <hr className='mt-3' />
          <div className='mt-3'>
            <label htmlFor="username" className='block text-base mb-2 '>username</label>
            <input type="text"  id="username" onChange={(e)=>(userName.current=e.target.value)}
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
          </div>
          <div className='mt-3'>
            <label htmlFor="pass" className='block text-base mb-2 '>username</label>
            <input type="text" id='pass' onChange={(e)=>(pass.current=e.target.value)} 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
          </div>
          <div className='mt-3 flex justify-between items-center'>
            <div>
                <input type="checkbox" />
                <label >Remember Me</label>
            </div>
            <div>
                <button  onClick={upDate} className='text-indigo-800 font-semibold'> Forget Password?</button>
             </div>
          </div>
            <div className='mt-5'>
               <button type='submit' onClick={onSubmit} className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full 
               rounded-md hover:bg-transparent hover:text-indigo-700 font-bold'>LogIn</button>
            </div>
        </div>  
    </div>
  )
}
