import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"

const AppSidebar = () => {
  return (
    <Sidebar className=' text-white text-xl font-semibold bg-[#1f1f58] '>
    <SidebarHeader className="p-4" />
    <Image src={'/logo.png'} width={150} height={60} alt='logo' />
    <SidebarContent className="p-4 mt-8">
      <ul className='flex flex-col gap-6 '>
        <Link href={'/admin'}><li>Dashboard</li></Link>
        <Link href={'/admin'}><li>All Certificates</li></Link>
        <Link href={'/admin/add-certificate'}><li>Add Certificates</li></Link>
        <Link href={'/admin'}><li>All Users</li></Link>
      </ul>
      <SidebarGroup />
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
  )
}

export default AppSidebar
