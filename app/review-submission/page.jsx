import React from "react";
import styles from "./page.module.css";
import { Home } from "lucide-react";
import Link from "next/link";

export default function ReviewSubmission() {
  return (
    <section className={styles.review}>
      <h1>
        Thank you for signing up! Your information is under review. Please check
        your email within 24 hours.
      </h1>

      <p>
        Please check your spam or junk folder if you don't see the email in your
        inbox.
      </p>

      <Link href="/" className={styles.homeLink}>
        <button>
          <span>Return to home</span>
          <Home className="size-4" />
        </button>
      </Link>
    </section>
  );
}
