import Footbar from "./components/Footbar";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { register } from "swiper/element/bundle";
import Cartcontext from "./components/Cartcontext";
import Sessionprovider from "./components/Sessionprovider";

register();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sessionprovider>
          <Cartcontext>
            <Navbar />
            {children}
            <Footbar />
          </Cartcontext>
        </Sessionprovider>
      </body>
    </html>
  );
}
