'use client'
import React,{useState} from 'react'
import {useSession} from 'next-auth/react'
import { AuthRequiredError } from '@/lib/exceptions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const page = ()=> {
  const {data:session}=useSession()
  
  if(session && session.user.role!=="ADMIN")throw new AuthRequiredError("this is only for admin")

  const [fristname,setFirstname]=useState("")
  const [lastname,setLastname]=useState("")
  const [email,setEmail]=useState("")
 const [firstnamerequired,setFirstnamerequired]=useState(false)
 const [lastnamerequired,setLastnamerequired]=useState(false)
 const [emailrequired,setEmailrequired]=useState(false)

const firstnameHendler=({target})=>{
  setFirstnamerequired(false)
  setFirstname(target.value)
}
const lastnameHendler=({target})=>{
  setLastnamerequired(false)
  setLastname(target.value)
}
const emailHendler=({target})=>{
  setEmailrequired(false)
  setEmail(target.value)
}




  const Submit=async()=>{
 if (fristname==="") { setFirstnamerequired(true)}  
 if (email==="") {setEmailrequired(true)}   
if (lastname==="") {setLastnamerequired(true)}
 try {
  console.log(session.user.accessToken);
  
  const res=await fetch("/api/user/createuser",{
    method: 'POST',
    body: JSON.stringify({
      fristname:fristname,
      lastname:lastname,
      email:email
    }),
    headers: {
      //  "Content-Type": "application/json",
    "Authorization":session.user.accessToken
   }
  })
  console.log({"data":res});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw Error('Failed to fetch data');
    console.log(res.statusText);
    
    const notify = () => toast("some thing wrong");
    notify()
  }
 
  return res.json();
}catch(error){
 console.log(error);
 throw Error('Failed to fetch data');
}
 
 
  }

  return (
    <div className=' grid items-center h-screen  justify-items-center place-content-center bg-slate-400 '>
      <div className='w-[450px] shadow-2xl py-5 px-7 shadow-indigo-500/40' >
        <h1 className='font-semibold text-2xl text-center py-2 my-2'>create user</h1>        
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium">frist name</label>
    <input onChange={firstnameHendler} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
     {firstnamerequired?( <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-600">required!*</label>):(<></>)}
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium">last name</label>
    <input onChange={lastnameHendler} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {lastnamerequired?( <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-600">required!*</label>):(<></>)}
  </div>
  
  <div className="mb-6">
    <label  htmlFor="email" className="block mb-2 text-sm font-medium">email</label>
    <input onChange={emailHendler} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@shemach.com" required />
    {emailrequired?( <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-600">required!*</label>):(<></>)}
  </div>
  
  <button onClick={Submit} type="submit" className="text-white ml-[150px] px-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>  
      </div>
      <ToastContainer />
      </div>
  )
  
}

export default page