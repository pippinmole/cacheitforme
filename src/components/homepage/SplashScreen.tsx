'use client'

import Link from "next/link";
import {Button} from "flowbite-react";
import {signIn, useSession} from "next-auth/react";

export default function SplashScreen() {

  const {data: session} = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-14 text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
          className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Faster Data.</span> Scalable
          AI.</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and
          drive economic growth.
        </p>

        <div className="mt-12 flex flex-row gap-4 justify-center">

          {session?.user ? (
            <>
              <Link href={"/dashboard"}>
                <Button gradientDuoTone="purpleToPink" size="lg">
                  <svg className="w-2 h-2 my-auto mr-3 text-white dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                  </svg>

                  Continue to Dashboard
                </Button>
              </Link>
            </>) : (
            <div onClick={() => signIn()}>
              <Button gradientDuoTone="purpleToPink" size="lg">
                <svg className="w-2 h-2 my-auto mr-3 text-white dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                </svg>

                Get Started
              </Button>
            </div>
          )
          }
        </div>

      </div>
    </main>
  )
}