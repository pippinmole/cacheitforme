import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import SiteBreadcrumb from "@/components/SiteBreadcrumb";

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout(props: Props) {
  return (
    <>
      <div className="flex flex-row">
        {/*<DashboardSidebar/>*/}

        {/*// Max width of 2xl is 1536px*/}
        <div className="pl-3 pr-24 flex-1 max-w-7xl mx-auto">
          <SiteBreadcrumb />

          {props.children}
        </div>
      </div>
    </>
  )
}
