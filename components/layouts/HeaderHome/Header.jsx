import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeaderHome = () => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        <img
          src="/assets/images/ocp.png"
          width={36}
          height={36}
          alt="OPC Group "
        />
      </Link>
      {/* Navigation Links */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">About the project</a>
          </li>
          <li>
            <a href="#">Get started</a>
          </li>
        </ul>
      </nav>
      {/*  */}
      {/* CTA Button */}
      <div className={styles.cta}>
        <Button
          className={`${styles.cta_btn} bg-[#171717] text-[#fff] hover:bg-[#171717]/90`}
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          variant="outline"
          className={`${styles.cta_btn}  bg-transparent text-[#171717] hover:text-[#171717]`}
        >
          <Link href="/signup">Register</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default HeaderHome;
