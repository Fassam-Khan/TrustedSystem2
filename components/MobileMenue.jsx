"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu } from "lucide-react"

export function MobileMenue() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline"><Menu/></Button>
      </DrawerTrigger>
      <DrawerContent className=" bg-white text-black" >
        <DrawerHeader>
          <DrawerTitle>
          <DrawerClose asChild className="absolute right-[22px]">
            <Button variant="">Cancel</Button>
          </DrawerClose>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 mt-10">
         <ul className="flex flex-col gap-10 justify-center text-lg">
            <Link href={'/'}><li>HOME</li></Link>
            <Link href={'/standards'}><li>STANDARDS</li></Link>
            <Link href={'/inspection'}><li>INSPECTION</li></Link>
            <Link href={'/training'}><li>TRAINING</li></Link>
            <Link href={'/certificates-company-search'}><li>VERIFY CERTIFICATE / REPORT</li></Link>
         </ul>
        </div>
        
      </DrawerContent>
    </Drawer>
  )
}