import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "@/components/kiln/Studio";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Studio />;
}
