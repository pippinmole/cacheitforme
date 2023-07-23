'use client'

import {SessionProvider} from "next-auth/react";
import {Flowbite} from "flowbite-react";
import NextNProgress from 'nextjs-progressbar';

type Props = {
  children: React.ReactNode
}

export default function Providers(props: Props) {
  return (
    <Flowbite>
      <SessionProvider>
        <NextNProgress height={6} color={"#000000"} showOnShallow={true}  />
        {props.children}
      </SessionProvider>
    </Flowbite>
  )
}