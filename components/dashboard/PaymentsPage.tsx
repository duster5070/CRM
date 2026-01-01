"use client";

import { useEffect, useState } from "react";
import { Project, Payment } from "@prisma/client";
import { ProjectWithPaymentsArray } from "@/types/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";

type ProjectWithPayments = Project & {
  payments: Payment[];
};

export default function PaymentsPage({
  userProjects,
}: {
  userProjects: ProjectWithPaymentsArray;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlProjectId = searchParams.get("pId");

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    urlProjectId ?? userProjects[0]?.id ?? null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * 🔁 Sync React state when URL changes
   * (Back / Forward navigation)
   */
  useEffect(() => {
    if (urlProjectId) {
      setSelectedProjectId(urlProjectId);
    }
  }, [urlProjectId]);

  /**
   * 🛡 Safety fallback for invalid / missing pId
   */
  const selectedProject =
    userProjects.find((p) => p.id === selectedProjectId) ?? userProjects[0];

  const payments = selectedProject?.payments ?? [];

  const handleProjectSelect = (projectId: string) => {
    router.replace(`?pId=${projectId}`, { scroll: false });
    setSelectedProjectId(projectId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow-md lg:hidden">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {selectedProject?.name ?? "Payments"}
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6 text-gray-900 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-80 transform border-r border-gray-200 bg-gray-50 p-4 transition-transform duration-300 dark:border-gray-700 dark:bg-gray-800 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4 lg:justify-start">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Projects
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-gray-900 dark:text-white" />
          </button>
        </div>

        <ul className="p-1 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          {userProjects.map((project) => {
            const active = project.id === selectedProject?.id;

            return (
              <li
                key={project.id}
                onClick={() => handleProjectSelect(project.id)}
                className={`cursor-pointer rounded-2xl p-4 transition
                  ${
                    active
                      ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-400 dark:from-blue-900/40 dark:to-blue-800/40 dark:ring-blue-500"
                      : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.name ?? "Project"}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {project.name ?? "Untitled Project"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Status: {project.status}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Payments */}
      <main className="flex-1 overflow-y-auto p-4 pt-20 lg:p-6 lg:pt-6">
        <h1 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white hidden lg:block">
          Payments
        </h1>

        {/* Mobile Card View */}
        <div className="space-y-4 lg:hidden">
          {payments.length === 0 ? (
            <div className="rounded-xl bg-white dark:bg-gray-800 p-8 text-center shadow">
              <p className="text-gray-400 dark:text-gray-500">
                No payments for this project
              </p>
            </div>
          ) : (
            payments.map((p) => (
              <div
                key={p.id}
                className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow transition hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(p.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${p.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                    {p.invoiceNumber}
                  </p>
                  <Link
                    href={`/project/invoice/${p.id}?pId=${selectedProject?.id}`}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Invoice #
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Title
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-300">
                  Amount
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                  >
                    No payments for this project
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {new Date(p.date).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">
                      {p.invoiceNumber}
                    </td>

                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {p.title}
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
                      ${p.amount.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/project/invoice/${p.id}?pId=${selectedProject?.id}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}