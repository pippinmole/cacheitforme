type Props = {
  children: React.ReactNode
}

export default function ProjectLayout(props: Props) {
  return (
    <div className="flex flex-row">
      <div className="px-14 py-8 flex-1">
        {props.children}
      </div>
    </div>
  )
}