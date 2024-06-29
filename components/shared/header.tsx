import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./nav-items";
import MobileNav from './mobile-nav'

const Footer = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="w-36">
          <Image src="/images/logo.svg" width={60} height={38} alt="DAR LOGO" />
        </Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full size-lg">
              <Link href="/sign-in">LOGIN</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Footer;
