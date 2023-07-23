'use client'

import {SessionProvider} from "next-auth/react";
import {Flowbite} from "flowbite-react";

type Props = {
  children: React.ReactNode
}

export default function Providers(props: Props) {
  return (
    <Flowbite>
    <SessionProvider>
      {props.children}
    </SessionProvider>
    </Flowbite>
  )
}