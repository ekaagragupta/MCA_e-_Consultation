import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { useDashboardStore } from "@/store/dashboardStore";
import { useTranslation } from 'react-i18next';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useDashboardStore();
  const { t } = useTranslation();

  return (
    <SidebarProvider defaultOpen={!sidebarCollapsed}>
      <div className="min-h-screen w-full bg-gradient-dashboard">
        {/* Global Navigation Header */}
        <header className="h-16 flex items-center justify-between px-4 bg-card border-b border-border shadow-elegant">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-accent transition-smooth" />
            <h1 className="text-xl font-semibold text-foreground">
              {t('title')}
            </h1>
          </div>
          <DashboardNavbar />
        </header>

        <div className="flex w-full">
          <AppSidebar />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}