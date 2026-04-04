import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import AdminHeader from "@/components/AdminHeader"

export default function Layout({ children }) {
  return (
    <>
    {/* <AdminHeader/> */}
    <SidebarProvider className="">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </>
  )
}