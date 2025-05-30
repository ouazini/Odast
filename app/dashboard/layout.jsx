// /app/dashboard/layout.jsx
import Link from "next/link";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!session.user.approved) {
    return <p>Your account is not approved yet.</p>;
  }

  return (
    <section className={styles.dashboard}>
      <aside className={styles.side}>
        {/* sidebar content */}
        <div className={styles.wrapper}>
          <div className={styles.tab}>
            <h1>Welcome to X Dashboard</h1>

            <div className={`${styles.flex_col_tabs}`}>
              <h2>Main Menu</h2>

              <Link href="/dashboard/tab1">
                <button>Tab One</button>
              </Link>
              <Link href="/dashboard/tab2">
                <button>Tab Two</button>
              </Link>
              <Link href="/dashboard/tab3">
                <button>Tab Three</button>
              </Link>
            </div>

            {/* Support Tab */}
            <div className={`${styles.flex_col_tabs}`}>
              <h2>COstum support</h2>

              <Link href="/dashboard/support">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>

                <button>Support</button>
              </Link>
            </div>

            {/* Submission */}
            <div className={styles.last_tab}>
              {session.user.role === "admin" && (
                <>
                  <h2>Admin Panel - Review Submissions</h2>

                  <Link href="/dashboard/submissions">
                    <button>View Submissions</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className={styles.dashboard_content}>{children}</div>
    </section>
  );
}
