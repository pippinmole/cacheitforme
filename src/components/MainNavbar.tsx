'use client';

import {Avatar, Button, DarkThemeToggle, Dropdown, Navbar} from 'flowbite-react';
import {useSession, signIn, signOut} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";

function getLastSegment(url: string): string | null {
  // Remove the query parameters from the URL, if any
  const urlWithoutParams = url.split('?')[0];

  // Split the URL by '/' to get the individual path segments
  const pathSegments = urlWithoutParams.split('/');

  // Filter out any empty segments (e.g., leading/trailing slashes)
  const validSegments = pathSegments.filter(segment => segment !== '');

  // Return the last segment if it exists, otherwise return null
  return validSegments.length > 0 ? validSegments[validSegments.length - 1] : null;
}

export default function NavbarWithDropdown() {

  const asPath = usePathname();
  const {data: session} = useSession();

  const lastPath = getLastSegment(asPath);

  console.log(lastPath)

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
            arrowIcon={false}
            label={<Avatar alt="User settings"
                           img={session.user.image ?? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded/>}
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
          active={lastPath?.toLowerCase() == null}
          href="/"
          as={Link}
        >
            Home
        </Navbar.Link>
        <Navbar.Link
          active={lastPath?.toLowerCase() === "dashboard".toLowerCase()}
          href="/dashboard"
          as={Link}>
          Dashboard
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}