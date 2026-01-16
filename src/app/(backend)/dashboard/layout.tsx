import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard - MaoMao",
  description: "Panel pengguna",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}