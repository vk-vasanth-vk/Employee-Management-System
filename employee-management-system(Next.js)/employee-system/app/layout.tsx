'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { EmployeeProvider } from './context/EmployeeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if the page was reloaded (not navigated)
    if (window.performance.navigation.type === 1) {
      // If the page was reloaded, redirect to /employeeList
      router.push('/employee/employeeList');
    }
  }, [router]);

  return (
    <EmployeeProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </EmployeeProvider>
  )
}
