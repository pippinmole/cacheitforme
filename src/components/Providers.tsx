'use client'

import {SessionProvider} from "next-auth/react";
import {Flowbite} from "flowbite-react";
import NextNProgress from 'nextjs-progressbar';
import ProgressBar from "@/components/ProgressBar";

type Props = {
  children: React.ReactNode
}

export default function Providers(props: Props) {
  return (
    <Flowbite>
      <SessionProvider>
        <ProgressBar />

        {props.children}
      </SessionProvider>
    </Flowbite>
  )
}