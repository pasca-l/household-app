import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "shadcn-ui";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
