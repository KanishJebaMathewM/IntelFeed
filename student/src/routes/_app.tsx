import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <AppSidebar />
      <main className="ml-[240px] min-h-screen px-10 py-8">
        <div className="mx-auto max-w-[1200px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
