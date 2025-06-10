import "@/app/ui/global.css";
import { lxgw } from "@/app/ui/fonts";
type Props = { children: React.ReactNode };
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${lxgw.className} antialiased`}>{children}</body>
    </html>
  );
}
