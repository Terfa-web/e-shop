import React from "react";
import Container from "@/app/components/Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

const NavBar = () => {
  return (
    <div className=" sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="border-b-[1px] py-4 ">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={` ${redressed.className} font-bold text-2xl`}
            >
              E-Shop
            </Link>

            <div className="hidden md:block">Search</div>

            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
