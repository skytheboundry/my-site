"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Add News", href: "/admin/dashboard/add-news" },
    { name: "Manage News", href: "/admin/dashboard/manage-news" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          Vanexa Admin
        </h2>

        <nav className="flex flex-col gap-4">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`p-2 rounded-lg ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}