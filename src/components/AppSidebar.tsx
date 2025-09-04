import { Calendar, Filter, TrendingUp, MessageSquare, Cloud, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { FilterPanel } from "./FilterPanel";
import { useTranslation } from 'react-i18next';

const menuItems = [
  { title: "dashboard", icon: BarChart3, url: "#overview" },
  { title: "comments", icon: MessageSquare, url: "#comments" },
  { title: "analytics", icon: TrendingUp, url: "#analytics" },
  { title: "wordcloud", icon: Cloud, url: "#wordcloud" },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { t } = useTranslation();

  return (
    <Sidebar 
      className={`border-r border-border bg-card shadow-card transition-smooth ${
        open ? "w-80" : "w-16"
      }`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wide">
            {t('navigation')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-smooth"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {open && <span className="text-sm font-medium">{t(item.title)}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filters Panel - Only show when sidebar is open */}
        {open && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
              <Filter className="h-3 w-3" />
              {t('advancedFilters')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <FilterPanel />
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Date Range - Only show when sidebar is open */}
        {open && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
              <Calendar className="h-3 w-3" />
              {t('dateRange')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3 pt-2">
                <div className="text-xs text-muted-foreground">
                  {t('showingLast30Days')}
                </div>
                <div className="text-xs bg-muted p-2 rounded">
                  {t('customDateRange')}
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}