import React from 'react'
import { FaFacebook, TextAlignEnd, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaBars ,FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';


const Header = () => {
   

 
    return (

        <header>
            {/* Top Header  */}
            <div className=" hidden md:block wrapper bg-[#16164e]">
                <div className='top-head flex justify-between  text-white p-2 items-center max-w-[1200px] m-auto h-[50px]'>
                    <div>
                        <p>Leaders in ISO Certification</p>
                    </div>
                    <div className='flex gap-6 items-center'>
                        <div className=' flex gap-4 text-gray-300'>
                            <FaFacebook className='text-2xl' />
                            <FaTwitter className='text-2xl' />
                            <FaLinkedin className='text-2xl' />
                            <FaInstagram className='text-2xl' />

                        </div>
                        <div className='flex gap-2 border-l pl-5 '>
                            <Image src='/uk.webp' alt='uk' width={24} height={24} />
                            English

                        </div>
                    </div>

                </div>


            </div>
            {/* Middle Header  */}
            <div className=' hidden md:block  wrapper max-w-[1200px] m-auto mt-4'>
                <div className="middle-head flex items-center">
                    <div>
                        <Image src='/logo.png' alt='logo' width={150} height={50} />
                    </div>
                    <div className='ml-25 flex gap-14'>
                        {/* Boxes  */}
                        <div className='flex items-center gap-2'>
                            <FaPhoneAlt className='text-2xl text-[16164e]' />
                            <div>
                                <p className='font-bold'>Call Us: 20 100 043 9791</p>
                                <p className='text-gray-500'>Whatsapp: 20 100 043 9791 </p>
                            </div>


                        </div>
                        <div className='flex items-center gap-2'>
                            <FaEnvelope className='text-2xl text-[16164e]' />
                            <div>
                                <p className='font-bold'>Mail us for help</p>
                                <p className='text-gray-500'>info@trustedsystempartners.com </p>
                            </div>


                        </div>
                        <div className='flex items-center gap-2'>
                            <FaMapMarkerAlt className='text-2xl text-[16164e]' />
                            <div>
                                <p className='font-bold'>Marketing Office</p>
                                <p className='text-gray-500'>45-745 Farmstead drive. Milton </p>
                            </div>


                        </div>

                    </div>
                </div>

            </div>

            {/* Bottom Header  */}
            <div className=' hidden md:block  bg-[#16164e] mt-6 '>
                <div className='max-w-[1200px] m-auto flex items-center h-[60px] justify-between'>
                    <div>
                        <ul className='text-white flex gap-4 items-center'>
                            <Link href={'/'}><li>HOME</li></Link>
                            <Link href={'/'}><li>STANDARDS</li></Link>
                            <Link href={'/'}><li>INSPECTION</li></Link>
                            <Link href={'/'}><li>TRAINING</li></Link>

                        </ul>

                    </div>
                    <div className='text-white border-l pl-3'>
                        VERIFY CERTIFICATION
                    </div>
                </div>
            </div>

            {/* Mobile Header  */}
            <div className='md:hidden pl-6 pr-6 mt-4 flex justify-between items-center'>
                <div>
                <Image src='/logo.png' width={150} height={50} alt='logo' />

                </div>
               

            </div>

            <div className='bg-black'>

            </div>




        </header>

    )
}

export default Header