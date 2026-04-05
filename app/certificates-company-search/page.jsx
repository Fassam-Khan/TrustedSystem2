import React from 'react'
import Header from '@/components/Header'
import SearchCerti from '@/components/SearchCerti'

const page = () => {
  return (
    <div>
      <Header/>
      <div className='bg-[#85a5ce] h-[250px] flex justify-center items-center'>
        <SearchCerti/>
      
      </div>
      
    </div>
  )
}

export default page
