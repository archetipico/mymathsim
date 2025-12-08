"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-linear-to-br from-slate-50 to-indigo-50 min-h-screen w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
