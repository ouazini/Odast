"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import styles from "./header.module.css";
import { Button } from "@/components/ui/button";

const HeaderDashboard = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <header className={styles.header}>
      <p className={styles.welcome}>Bienvenue, {session.user.fullName}</p>
      {/* Logout button */}
      <Button
        className={styles.btn}
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        se déconnecter
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
            d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </Button>
    </header>
  );
};

export default HeaderDashboard;
