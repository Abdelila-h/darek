import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col">
        <Link href="/">
          <Image src="/images/logo.svg" alt="LOGO" width={64} height={38}></Image>
        </Link>
        <p>2024 DAREK, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
