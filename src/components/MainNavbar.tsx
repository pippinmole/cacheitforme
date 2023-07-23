'use client';

import {Avatar, Button, DarkThemeToggle, Dropdown, Navbar} from 'flowbite-react';
import {useSession, signIn, signOut} from "next-auth/react";

export default function NavbarWithDropdown() {

  const {data: session} = useSession();

  return (
    <Navbar
      fluid={false}
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          CacheItFor.me
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">

        <DarkThemeToggle className="mx-4" />

        {session?.user ? (
          <Dropdown
            inline
            label={<Avatar alt="User settings"
                           img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
          >
            <Dropdown.Header>
            <span className="block text-sm font-bold">
              {session.user?.name}
            </span>
              <span className="block truncate text-sm font-medium">
              {session.user?.email}
            </span>
            </Dropdown.Header>
            {/*<Dropdown.Item>*/}
            {/*  dashboard*/}
            {/*</Dropdown.Item>*/}
            {/*<Dropdown.Item>*/}
            {/*  Settings*/}
            {/*</Dropdown.Item>*/}
            {/*<Dropdown.Item>*/}
            {/*  Earnings*/}
            {/*</Dropdown.Item>*/}
            {/*<Dropdown.Divider/>*/}
            <Dropdown.Item onClick={() => signOut()}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex flex-row gap-3">
            <div onClick={() => signIn()}>
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </div>

            <Button gradientDuoTone="redToYellow" outline>
              Sign Up
            </Button>
          </div>
        )}

        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/dashboard">
          Dashboard
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}