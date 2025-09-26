"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconHome, IconUsers, IconBook, IconMessageCircle, IconChartBar, IconX, IconMenu } from "@tabler/icons-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: IconHome },
  { name: "Students", href: "/admin/students", icon: IconUsers },
  { name: "Lessons", href: "/admin/lessons", icon: IconBook },
  { name: "Conversations", href: "/admin/conversations", icon: IconMessageCircle },
  { name: "Analytics", href: "/admin/analytics", icon: IconChartBar },
]

interface Props {
  children: React.ReactNode
}

const AdminLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RC</span>
            </div>
            <span className="font-semibold text-gray-900">Admin Panel</span>
          </div>
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded" onClick={() => setSidebarOpen(false)}>
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded" onClick={() => setSidebarOpen(true)}>
                <IconMenu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Resilient Coders Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Welcome back, Admin</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
