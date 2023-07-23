'use client'

import {Button, Table} from "flowbite-react";
import Link from "next/link";
import DeleteProjectModal from "@/components/dashboard/DeleteProjectModal";
import {ProjectWithCaches} from "@/lib/prismatypes";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CreateCacheModal from "@/components/project/CreateCacheModal";
import CopyToClipboard from "@/components/CopyToClipboard";
import DeleteCacheModal from "@/components/project/DeleteCacheModal";

type CacheOverviewProps = {
  project: ProjectWithCaches
}

export default function CacheOverview(props: CacheOverviewProps) {

  const [creteCacheModalOpen, setCreateCacheModalOpen] = useState(false);

  const router = useRouter()
  const project = props.project

  async function deleteCache(cacheId: string) {
    try {
      const response = await fetch("/api/projects/" + project.id + "/caches", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: project.id,
          cacheId: cacheId
        })
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

      <CreateCacheModal show={creteCacheModalOpen} onClose={() => setCreateCacheModalOpen(false)} project={project}/>

      <h2
        className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">
        Overview of {project.name}
      </h2>

      <div className="w-full flex flex-row justify-end p-4">
        <div onClick={() => setCreateCacheModalOpen(true)}>
          <Button gradientDuoTone="greenToBlue" size="sm">
            Add Cache
          </Button>
        </div>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>
            Cache Name
          </Table.HeadCell>
          <Table.HeadCell>
            URL
          </Table.HeadCell>
          <Table.HeadCell>
            Cache Duration
          </Table.HeadCell>
          <Table.HeadCell>
            Created At
          </Table.HeadCell>
          <Table.HeadCell>
            Last Updated
          </Table.HeadCell>
          <Table.HeadCell>
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {project && project.caches.map((cache) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={cache.id}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cache.name}
              </Table.Cell>
              <Table.Cell>

                <CopyToClipboard text={cache.url} >
                  {limitStringLength(cache.url, 60)}
                </CopyToClipboard>
              </Table.Cell>
              <Table.Cell>
                1 hour
              </Table.Cell>
              <Table.Cell>
                {formatDateTime(cache.createdAt)}
              </Table.Cell>
              <Table.Cell>
                {formatDateTime(cache.updatedAt)}
              </Table.Cell>
              <Table.Cell className="flex flex-row gap-3 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                <Link href={'/projects/' + project.id}>
                  <Button size="xs">
                    View
                  </Button>
                </Link>

                <DeleteCacheModal onConfirm={() => deleteCache(cache.id)} cache={cache}/>
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>
    </>
  )
}

function limitStringLength(inputString: string, length: number): string {
  const ellipsis = "...";

  if (inputString.length <= length) {
    return inputString;
  } else {
    return inputString.substring(0, length - ellipsis.length) + ellipsis;
  }
}

function formatDateTime(date: Date): string {

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}