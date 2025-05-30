import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { HeaderDashboard } from "@/components/index";
import styles from "./page.module.css";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!session.user.approved) {
    return <p>Your account is not approved yet.</p>;
  }

  return (
    <main>
      <HeaderDashboard />
      <section className={styles.flex}>
        <h1>Welcome to (X) dashboard!</h1>

        <div className={`${styles.content} flex flex-col gap-3`}>
          <h3>What is (x)?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
            incidunt accusamus optio voluptates eius, eligendi eum nam modi
            quis! Eius veritatis corporis voluptatibus? Quisquam nesciunt
            dignissimos ducimus, ex quae commodi?
          </p>
        </div>

        <div className={styles.btns}>
          <h3>Start Browsing:</h3>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/tab1" className={styles.btn}>
              Tab one
            </Link>
            <Link href="/dashboard/tab1" className={styles.btn}>
              Tab one
            </Link>
            <Link href="/dashboard/tab2" className={styles.btn}>
              Tab two
            </Link>
            <Link href="/dashboard/tab3" className={styles.btn}>
              Tab three
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
