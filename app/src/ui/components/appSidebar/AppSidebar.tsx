import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Users,
  LayoutDashboard,
  BanknoteArrowDown,
  ChevronRightIcon,
  FolderIcon,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export function AppSidebar() {
  const { roles } = useAuthStore();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpenCollapsableChange = (open: boolean) => {
    setOpen(open);
  };

  const items = [
    {
      content: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
      ],
      role: ["company", "employee"],
      label: "Dashboard",
      collapsable: false,
    },
    {
      content: [
        {
          title: "Employees",
          url: "/employees",
          icon: Users,
        },
      ],
      role: ["company"],
      label: "Employees",
      collapsable: false,
    },
    {
      content: [
        {
          title: "Expenses",
          url: "/expenses",
          icon: BanknoteArrowDown,
        },
        {
          title: "Categories",
          url: "/expenses/categories",
          icon: Tag,
        },
      ],
      role: ["company", "employee"],
      label: "Expenses",
      collapsable: true,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader />

      <div className="overflow-auto">
        {items.map((item, index) => {
          const isAllowed = item.role.some((role) => roles.includes(role));

          if (!isAllowed) return null;

          const isActiveGroup = item.content.some(
            (content) =>
              location.pathname === content.url ||
              location.pathname.startsWith(content.url + "/"),
          );

          return (
            <SidebarContent
              className="flex-initial overflow-hidden"
              key={index}
            >
              <SidebarGroupLabel>{item.label}</SidebarGroupLabel>

              {item.collapsable ? (
                <Collapsible
                  defaultOpen={isActiveGroup}
                  onOpenChange={handleOpenCollapsableChange}
                >
                  <CollapsibleTrigger
                    asChild
                    className={`${open ? "text-blue-600" : "text-black"} hover:text-blue-600`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`group w-full justify-start transition ease-in-out duration-200
                      ${isActiveGroup ? "text-blue-600" : "hover:text-blue-600"}
                    `}
                    >
                      <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                      <FolderIcon />
                      {item.label}
                    </Button>
                  </CollapsibleTrigger>

                  {item.content.map((content) => {
                    const isActiveItem = location.pathname === content.url;

                    return (
                      <CollapsibleContent
                        key={content.title}
                        className="ml-8 mt-2"
                      >
                        <Link to={content.url}>
                          <div
                            className={`flex items-center gap-2 rounded px-2 py-1 text-sm transition ease-in-out duration-200
                            ${
                              isActiveItem
                                ? "text-blue-600"
                                : "hover:text-blue-600"
                            }
                          `}
                          >
                            <content.icon size="16px" />
                            <span>{content.title}</span>
                          </div>
                        </Link>
                      </CollapsibleContent>
                    );
                  })}
                </Collapsible>
              ) : (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.content.map((content) => {
                      const isActiveItem = location.pathname === content.url;

                      return (
                        <SidebarMenuItem key={content.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              to={content.url}
                              className={`flex items-center gap-2
                              ${
                                isActiveItem
                                  ? "bg-accent text-accent-foreground"
                                  : ""
                              }
                            `}
                            >
                              <content.icon />
                              <span>{content.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarContent>
          );
        })}
      </div>

      <SidebarFooter />
    </Sidebar>
  );
}
