import React from 'react'
import Link from 'next/link'

const CertificateCard = () => {
  return (
    <>
    <Link href={'/admin/all-certificates'} className='bg-blue-300   w-[250px] h-[150px] rounded-2xl p-3 flex flex-col justify-center'>
        <h2 className='text-2xl text-white font-bold'>All Certificates</h2>
        <p className='text-3xl font-bold'>20</p>
      
    </Link>
    <Link href={'/admin/all-users'} className='bg-blue-300   w-[250px] h-[150px] rounded-2xl p-3 flex flex-col justify-center'>
        <h2 className='text-2xl text-white font-bold'>All User</h2>
        <p className='text-3xl font-bold'>20</p>
      
    </Link>

    </>
  )
}

export default CertificateCard
