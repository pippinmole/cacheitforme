'use client'

import {Breadcrumb} from "flowbite-react";
import {HiHome} from "react-icons/hi";
import {usePathname} from "next/navigation";

export default function SiteBreadcrumb() {
  const pathname = usePathname()

  const includedPaths = [
    {
      path: "/",
      name: "Home"
    },
    {
      path: "/dashboard",
      name: "Dashboard"
    },
    {
      path: "/dashboard/project",
      name: "Projects"
    }
  ]

  const result = []

  for (const item of includedPaths) {
    const containsPath = pathname.includes(item.path);
    if(containsPath) {
      result.push(item);
    }
  }

  const breadcrumbItems = result.map((item, index) => {
    const isLastItem = index === includedPaths.length - 1;
    const isHome = item.path === "/";

    return (
      <Breadcrumb.Item key={item.path} href={isLastItem ? undefined : item.path} icon={isHome ? HiHome : undefined}>
        <p>{item.name}</p>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
      {breadcrumbItems}
    </Breadcrumb>
  );
}