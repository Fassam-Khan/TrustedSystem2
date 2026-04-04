import React from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
const AdminHeader = () => {
  return (
    <div className='bg-white flex items-center justify-between p-4'>
      <div className='flex items-center gap-5'>
        <Image src={'/logo.png'} alt='logo' width={150} height={60} />
        <div>
          <form action="" className='bg-gray-300 p-2 rounded-3xl pl-4 flex items-center'>
            <input type="text" placeholder='Enter certificates' className='outline-none' />
            <Search className='w-5 h-5 cursor-pointer' />
          </form>
        </div>
      </div>
      <div>
        <button className='bg-red-500 rounded cursor-pointer text-white p-2'>Logout</button>
      </div>

    </div>
  )
}

export default AdminHeader
