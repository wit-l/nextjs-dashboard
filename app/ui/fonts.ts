import { Inter, Lusitana } from "next/font/google";
import LocalFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const lxgw = LocalFont({
  src: "../fonts/lxgw.woff2",
  weight: "400",
});
