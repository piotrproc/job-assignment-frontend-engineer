import type { ReactNode } from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

type ActiveNav = "home" | "editor" | "settings" | "login" | "logout";

interface AppLayoutProps {
  children: ReactNode;
  activeNav?: ActiveNav;
}

export default function AppLayout({ children, activeNav = "home" }: AppLayoutProps) {
  return (
    <>
      <NavigationBar activeNav={activeNav} />
      {children}
      <Footer />
    </>
  );
}
