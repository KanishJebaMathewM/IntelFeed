import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to feed…</p>
        <Link to="/feed" className="text-primary font-semibold underline mt-2 inline-block">Go to Feed</Link>
      </div>
      <script dangerouslySetInnerHTML={{ __html: "window.location.replace('/feed')" }} />
    </div>
  ),
});
