'use client'

import {Button, Label, Modal, TextInput} from "flowbite-react";
import {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {CacheCreateRequest} from "@/app/api/projects/[projectId]/caches/route";
import {ProjectWithCaches} from "@/lib/prismatypes";

type CreateCacheModalProps = {
  show: boolean
  onClose: () => void;
  project: ProjectWithCaches;
}

export default function CreateCacheModal(props: CreateCacheModalProps) {

  const router = useRouter()

  const [urlValid, setUrlValid] = useState(true);

  const [newCache, setNewCache] = useState<CacheCreateRequest>();

  async function createProject() {
    try {
      const response = await fetch(`/api/projects/${props.project.id}/caches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newCache
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.refresh();
        props.onClose();
      }
    } catch (error) {
      console.error('Error fetching caches:', error);
    }
  }

  const updateProjectName = (event: any) => {
    setNewCache({
      ...newCache,
      name: event.target.value.toString()
    } as CacheCreateRequest)
  }

  const updateUrl = (event: ChangeEvent<HTMLInputElement>) => {
    validateUrl(event);

    setNewCache({
      ...newCache,
      url: event.target.value.toString()
    } as CacheCreateRequest)
  }

  const validateUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    try {
      const url = new URL(value);
      setUrlValid(url.protocol === "http:" || url.protocol === "https:");
    } catch (_) {
      setUrlValid(false);
    }
  }

  return (
    <Modal show={props.show} size="md" popup onClose={props.onClose}>
      <Modal.Header/>
      <Modal.Body>
        <div className="space-y-6">

          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create a new cache
          </h3>

          <>
            <div className="mb-2 block">
              <Label htmlFor="text" value="Cache Name"/>
            </div>
            <TextInput id="text" placeholder="ACME Cache" onChange={updateProjectName} required/>
          </>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="text" value="URL"/>
            </div>
            <TextInput
              color={urlValid ? "success" : "failure"}
              helperText={urlValid ? null : <>Please enter a valid URL</>}
              id="username4"
              placeholder="Bonnie Green"
              onChange={(e) => updateUrl(e)}
              required
            />
          </div>


          <div className="w-full flex mx-auto">
            <Button onClick={() => createProject()}>Create Project</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}