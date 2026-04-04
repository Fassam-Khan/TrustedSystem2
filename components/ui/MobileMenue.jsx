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
import { FaBars } from "react-icons/fa"

export function MobileMenue() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline"><FaBars/></Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#16164e] text-white text-xl" >
        <DrawerHeader>
          <DrawerTitle>
          <DrawerClose asChild className="absolute right-[10px]">
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 mt-10">
         <ul className="flex flex-col gap-10 justify-center">
            <Link href={'/'}><li>HOME</li></Link>
            <Link href={'/'}><li>STANDARDS</li></Link>
            <Link href={'/'}><li>INSPECTION</li></Link>
            <Link href={'/'}><li>TRAINING</li></Link>
            <Link href={'/'}><li>VERIFY CERTIFICATE / REPORT</li></Link>
            <Link href={'/'}><li>VERIFY PERSONAL CERTIFICATE</li></Link>
         </ul>
        </div>
        
      </DrawerContent>
    </Drawer>
  )
}