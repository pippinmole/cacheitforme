'use client'

import {Button, Table} from "flowbite-react";
import {useEffect, useState} from "react";
import CreateProjectModal from "@/components/dashboard/CreateProjectModal";
import Link from "next/link";
import DeleteProjectButton from "@/components/dashboard/DeleteProjectModal";
import {useRouter} from "next/navigation";
import SiteBreadcrumb from "@/components/SiteBreadcrumb";
import {HiPlus} from "react-icons/hi";

type DashboardOverviewProps = {
  projects: any[]
}

export default function DashboardOverview(props: DashboardOverviewProps) {

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const router = useRouter()

  async function deleteProject(projectId: string) {
    try {
      const response = await fetch("api/projects", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({projectId: projectId})
      });

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error fetching caches:', error);
    }
  }

  return (
    <>
      <CreateProjectModal show={createModalOpen} onClose={() => setCreateModalOpen(false)}/>

      <div className="w-full flex flex-row justify-end p-4">
        <h2
          className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white
                    flex-1">
          Projects
        </h2>

        <div onClick={() => setCreateModalOpen(true)}>
          <Button gradientDuoTone="greenToBlue" size="sm">
            <HiPlus className="my-auto mr-2"/>

            Add Project
          </Button>
        </div>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>
            Project Name
          </Table.HeadCell>
          <Table.HeadCell>
            Caches Count
          </Table.HeadCell>
          <Table.HeadCell>
            Category
          </Table.HeadCell>
          <Table.HeadCell>
            Price
          </Table.HeadCell>
          <Table.HeadCell>
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {props.projects && props.projects.map((project) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={project.id}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {project.name}
              </Table.Cell>
              <Table.Cell>
                {project.caches.length}
              </Table.Cell>
              <Table.Cell>
                Laptop
              </Table.Cell>
              <Table.Cell>
                $2999
              </Table.Cell>
              <Table.Cell className="flex flex-row gap-3 font-medium text-cyan-600 dark:text-cyan-500">
                <Link href={'dashboard/project/' + project.id}>
                  <Button size="xs">
                    View
                  </Button>
                </Link>

                <DeleteProjectButton onConfirm={() => deleteProject(project.id)} project={project}/>
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>

    </>
  )
}