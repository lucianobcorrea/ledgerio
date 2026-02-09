import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, LayoutDashboard } from "lucide-react";
import { Link } from "react-router";

export function AppSidebar() {
  const items = [
    {
      content: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
      ],
      label: "Dashboard",
    },
    {
      content: [
        {
          title: "Employees",
          url: "/employees",
          icon: Users,
        },
      ],
      label: "Employees",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <div className="overflow-auto">
        {items.map((item, index) => (
          <SidebarContent className="flex-initial overflow-hidden" key={index}>
            <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.content.map((content) => (
                  <SidebarMenuItem key={content.title}>
                    <SidebarMenuButton asChild>
                      <Link to={content.url}>
                        <content.icon />
                        <span>{content.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarContent>
        ))}
      </div>
      <SidebarFooter />
    </Sidebar>
  );
}
