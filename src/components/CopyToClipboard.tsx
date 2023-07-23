import {Tooltip} from "flowbite-react";

type CopyToClipboardProps = {
  children: React.ReactNode
  text: string
}

export default function CopyToClipboard(props: CopyToClipboardProps) {

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.text)
  }

  return (
    <Tooltip content="Copy to clipboard" className="inline-flex">
      <span className="cursor-pointer" onClick={async () => await copyToClipboard()}>
        {props.children}
      </span>
    </Tooltip>
  )
}