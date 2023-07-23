import SiteBreadcrumb from "@/components/SiteBreadcrumb";

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout(props: Props) {
  return (
    <div className="flex flex-row">
      {/*<DashboardSidebar/>*/}

      <div className="pl-3 flex-1 max-w-7xl mx-auto">
        <SiteBreadcrumb/>

        {props.children}
      </div>
    </div>
  )
}