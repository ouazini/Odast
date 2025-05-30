import React from "react";
import styles from "./page.module.css";
import { HeaderHome } from "@/components/index";
import { Button } from "@/components/ui/button";
import { FeatherIcon, Link } from "lucide-react";

export default function Home() {
  return (
    <React.Fragment>
      <HeaderHome />
      {/* Hero  */}
      <section className={styles.hero}>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 z-[99] transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#460591] to-[#0cb8a1] opacity-30"
          />
        </div>
        <div className={styles.content}>
          <h1>
            Analytique des ressource d'eau et préduction de sessions séchresses.
          </h1>
          <a href="#features">
            <Button
              variant="outline"
              className={`${styles.button} border-none`}
            >
              Dashboard Features
              <FeatherIcon />
            </Button>
          </a>
        </div>
        {/* Réalise Par */}
        <div className={styles.auth}>
          <h2>
            Réalise Par:
            <a href="#add-you-linkedin">
              <u>Mohammed Ouazini</u>
            </a>
            <Link size={15} />
          </h2>
        </div>
      </section>
    </React.Fragment>
  );
}
