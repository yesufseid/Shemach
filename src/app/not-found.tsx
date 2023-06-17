  'use client'

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-1/2 text-center '>
      <h2 className='font-bold my-3'>Not Found</h2>
      <p className='font-semibold '>Could not find requested resource</p>
      <p className=' mt-4'>
        View <Link href="/" className='border rounded-full bg-sky-800 hover:bg-transparent px-3 py-2 '>go to home</Link>
      </p>
    </div>
  )
}