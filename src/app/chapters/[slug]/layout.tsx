import { Sidebar } from "@/components/Sidebar";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - rendered ONCE for all chapters */}
      <Sidebar />

      {/* Main content area - only {children} changes */}
      <main className="flex-1 flex flex-col">
        <header className="border-b">{/* Header content */}</header>

        <div className="flex-1 overflow-auto">
          {children} {/* ← This swaps between chapter pages */}
        </div>
      </main>
    </div>
  );
}
export const dynamic = "force-static"; // Cache the layout forever
