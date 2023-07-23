import SiteBreadcrumb from "@/components/SiteBreadcrumb";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout(props: Props) {
  return (
    <div className="flex flex-row dark:bg-gray-800 min-h-screen">
      <DashboardSidebar/>

      <div className="pl-3 flex-1 max-w-7xl mx-auto">
        <SiteBreadcrumb/>

        {props.children}
      </div>
    </div>
  )
}