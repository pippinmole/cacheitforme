'use client'

import {Breadcrumb} from "flowbite-react";
import {HiHome} from "react-icons/hi";

export default function SiteBreadcrumb() {
  return (
    <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
      <Breadcrumb.Item
        href="#"
        icon={HiHome}
      >
        <p>
          Home
        </p>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">
        Projects
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        Flowbite React
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}