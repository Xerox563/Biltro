import Sidebar from "@/components/dashboard/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f5ff]">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
