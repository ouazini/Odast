import React from "react";
import { HeaderDashboard } from "@/components/index";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

const page = () => {
  return (
    <>
      <HeaderDashboard />
      <section className={styles.flex}>
        <h1>Need Assistance?</h1>
        <div className="flex flex-col gap-1">
          <Link href="mailto:johndoe@gmail.com">
            &bull; Email: <u>mohammedouzini@gmail.com</u>
          </Link>
          <Link href="#linkedin">
            &bull;LinkedIn: <u>linkedin.com/in/mohammed-ouzini</u>
          </Link>
        </div>
      </section>
    </>
  );
};

export default page;
