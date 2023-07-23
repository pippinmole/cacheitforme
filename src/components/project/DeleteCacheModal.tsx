'use client'

import {Button, Label, Modal, Spinner, TextInput} from "flowbite-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {HiOutlineExclamationCircle, HiPlus} from "react-icons/hi";

type DeleteCacheModalProps = {
  cache: any;
  onConfirm: () => Promise<void>;
}

export default function DeleteCacheModal(props: DeleteCacheModalProps) {

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [show, setShow] = useState(false);

  const confirmedPressed = () => {
    setDeleteLoading(true);
    props.onConfirm().then(() => {
      setShow(false);
      setDeleteLoading(false);
    });
  };

  return (
    <>
      <Button size="xs" color="failure" onClick={() => setShow(true)}>
        Delete
      </Button>

      <Modal show={show} size="md" popup onClose={() => setShow(false)}>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete:
              <span className="ml-1 font-bold">{props.cache.name}</span>?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => confirmedPressed()}>
                {deleteLoading ?
                  (<Spinner aria-label="Default status example" />) : (
                    <>Yes, Im sure</>)
                }

              </Button>
              <Button color="gray" onClick={() => setShow(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}