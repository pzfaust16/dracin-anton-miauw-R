"use client";

import { WebsiteSetting } from "@/generated/prisma/client";
import { createContext, useContext, ReactNode } from "react";

interface WebsiteSettingsContextType {
  settings: WebsiteSetting | null;
}

const WebsiteSettingsContext = createContext<WebsiteSettingsContextType>({
  settings: null,
});

export function WebsiteSettingsProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: WebsiteSetting | null;
}) {
  return (
    <WebsiteSettingsContext.Provider value={{ settings }}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);
  if (context === undefined) {
    throw new Error("useWebsiteSettings must be used within a WebsiteSettingsProvider");
  }
  return context;
}
