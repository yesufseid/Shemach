"use client"
import React,{useRef, useState} from 'react'
import {signIn } from 'next-auth/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { log } from 'console';
 

 
export const metadata: Metadata = {
  title: 'login ',
  description: 'login page',
}
 
export default function page() {
const userName=useRef("")
const pass=useRef("")
const [error,setError]=useState(false)

const onSubmit=(()=>{
  setError(false)
    const result= signIn("credentials",{
        username:userName.current,
        password:pass.current,
        redirect:true,
        callbackUrl:"/"
    })
    if(result===null){
       return setError(true)
    }
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
            <label htmlFor="pass" className='block text-base mb-2 '>Password</label>
            <input type="password" id='pass' onChange={(e)=>(pass.current=e.target.value)} 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' />
          </div>
          <div className='mt-3 flex justify-between items-center'>
            <div>
                <input type="checkbox" />
                <label >Remember Me</label>
            </div>
            <div>
                <Link href='/updatePassword' className='text-indigo-800 font-semibold'> Forget Password?</Link>
             </div>
          </div>
            <div className='mt-5'>
              {error?(<p className='block font-semibold mb-2 text-red-600'>please cheak your password !</p>):null}
               <button type='submit' onClick={onSubmit} className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full 
               rounded-md hover:bg-transparent hover:text-indigo-700 font-bold'>LogIn</button>
            </div>
        </div>  
    </div>
  )
}
