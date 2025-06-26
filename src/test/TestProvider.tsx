import { ReactNode } from "react";
import { createTestQueryClient } from "./utils";
import { QueryClientProvider } from "@tanstack/react-query";

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const client = createTestQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
