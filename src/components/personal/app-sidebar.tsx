import { Earth, Home, Radius, type LucideProps } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Selector } from "./selector";
import { COMPLEX_NUMBERS, HOME } from "@/paths";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type websiteItemType = {
  title: string;
  description: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const websiteItems = [
  {
    title: "Home",
    description: "Where all begins.",
    url: HOME,
    icon: Home,
  },
  {
    title: "Complex Numbers",
    description: "Introduction to complex numbers and their applications.",
    url: COMPLEX_NUMBERS,
    icon: Radius,
  },
] as websiteItemType[];

export const AppSidebar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <Sidebar variant="sidebar" side="left">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-row justify-between mb-4">
            <SidebarGroupLabel>{t("MyMathSim")}</SidebarGroupLabel>

            <Selector
              value={i18n.language}
              icon={<Earth />}
              onValueChange={(value) => changeLanguage(value)}
              items={[
                {
                  value: "en",
                  label: t("english"),
                },
                {
                  value: "it",
                  label: t("italian"),
                },
              ]}
            />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {websiteItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
