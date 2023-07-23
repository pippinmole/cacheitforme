'use client' // Error components must be Client Components

import { useEffect } from 'react'

type DashboardErrorProps = {
  error: Error
  reset: () => void
}

export default function DashboardError({error, reset}: DashboardErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        // Attempt to recover by trying to re-render the segment
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}