'use client'

import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {ProjectCreateRequest} from "@/app/api/projects/route";

type CreateProjectModalProps = {
  show: boolean
  onClose: () => void;
}

export default function CreateProjectModal(props: CreateProjectModalProps) {

  const router = useRouter()

  const [newProject, setNewProject] = useState<ProjectCreateRequest>();

  async function createProject() {
    try {
      const response = await fetch("api/projects", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newProject
        })
      });

      const data = await response.json();

      if(response.ok) {
        router.refresh();
        props.onClose();
      }
    } catch (error) {
      console.error('Error fetching caches:', error);
    }
  }

  const updateProjectName = (event: any) => {
    setNewProject({
      ...newProject,
      projectName: event.target.value
    })
  }

  return (
    <Modal show={props.show} size="md" popup onClose={props.onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create a new Project
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text" value="Project Name" />
            </div>
            <TextInput id="text" placeholder="ACME Project" onChange={updateProjectName} required />
          </div>


          <div className="w-full flex content-stretch">
            <Button onClick={() => createProject()}>Create Project</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}