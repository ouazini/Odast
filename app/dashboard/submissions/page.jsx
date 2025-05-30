import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchSubmissionsFromDB } from "@/lib/submissions";
import SubmissionsList from "@/components/SubmissionLIst/SubmissionList";
import { HeaderDashboard } from "@/components/index";
import styles from "./page.module.css";

export default async function submissions() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Redirect non-admins
  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  const submissions = await fetchSubmissionsFromDB();
  console.log(submissions);

  return (
    <>
      <HeaderDashboard />
      <section className={styles.submissions}>
        <h1>Show all submissions:</h1>
        <SubmissionsList submissions={submissions} />
      </section>
    </>
  );
}
