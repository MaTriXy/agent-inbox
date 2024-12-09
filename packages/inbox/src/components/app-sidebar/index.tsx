"use client";

import NextLink from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Calendar,
  FileText,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
import { agentInboxSvg } from "../agent-inbox/components/agent-inbox-logo";
import { SettingsPopover } from "../agent-inbox/components/settings-popover";
import { PillButton } from "../ui/pill-button";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { TooltipIconButton } from "../ui/assistant-ui/tooltip-icon-button";

const gradients = [
  "linear-gradient(to right, #FF416C, #FF4B2B)", // Red-Orange
  "linear-gradient(to right, #4158D0, #C850C0)", // Purple-Pink
  "linear-gradient(to right, #0093E9, #80D0C7)", // Blue-Cyan
  "linear-gradient(to right, #8EC5FC, #E0C3FC)", // Light Blue-Purple
  "linear-gradient(to right, #43E97B, #38F9D7)", // Green-Turquoise
  "linear-gradient(to right, #FA8BFF, #2BD2FF)", // Pink-Blue
  "linear-gradient(to right, #FEE140, #FA709A)", // Yellow-Pink
  "linear-gradient(to right, #3EECAC, #EE74E1)", // Green-Pink
  "linear-gradient(to right, #4facfe, #00f2fe)", // Blue-Cyan
  "linear-gradient(to right, #F6D242, #FF52E5)", // Yellow-Pink
  "linear-gradient(to right, #00C6FB, #005BEA)", // Light Blue-Dark Blue
  "linear-gradient(to right, #FEC163, #DE4313)", // Orange
  "linear-gradient(to right, #92FE9D, #00C9FF)", // Green-Blue
  "linear-gradient(to right, #FC466B, #3F5EFB)", // Pink-Purple
  "linear-gradient(to right, #3B2667, #BC78EC)", // Deep Purple
];

const items = [
  {
    title: "csBot",
    url: "#",
    icon: Home,
  },
  {
    title: "Email Assistant",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Travel Assistant",
    url: "#",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-[0px] bg-[#F9FAFB]">
      <SidebarContent className="flex flex-col h-screen pb-9 pt-6">
        <div className="flex items-center justify-between px-11">
          <div className="flex-shrink-0 w-full">{agentInboxSvg}</div>
          <AppSidebarTrigger isOutside={false} className="mt-1" />
        </div>
        <SidebarGroup className="flex-1 overflow-y-auto pt-6">
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="flex flex-col gap-2 justify-between h-full">
              <div className="flex flex-col gap-2 pl-7">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                          style={{
                            background:
                              gradients[
                                Math.floor(Math.random() * gradients.length)
                              ],
                          }}
                        >
                          {item.title.slice(0, 1).toUpperCase()}
                        </div>
                        <span className="font-medium text-black">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>

              <div className="flex flex-col gap-3 pl-7">
                <SettingsPopover />
                <NextLink
                  href="https://github.com/langchain-ai/agent-uxs/blob/main/packages/inbox/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PillButton
                    variant="outline"
                    className="flex gap-2 items-center justify-center text-gray-800"
                    size="lg"
                  >
                    <FileText />
                    <span>Documentation</span>
                  </PillButton>
                </NextLink>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const sidebarTriggerSVG = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2V14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
      stroke="#3F3F46"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export function AppSidebarTrigger({
  isOutside,
  className,
}: {
  isOutside: boolean;
  className?: string;
}) {
  const { toggleSidebar, open } = useSidebar();

  if (isOutside && open) {
    // If this component is being rendered outside the sidebar view, then do not render if open.
    // This way we can render the trigger inside the main view when open.
    return null;
  }

  return (
    <TooltipIconButton
      tooltip="Toggle Sidebar"
      onClick={toggleSidebar}
      className={className}
    >
      {sidebarTriggerSVG}
    </TooltipIconButton>
  );
}
