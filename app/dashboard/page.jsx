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
    return <p>pas encore autorisé</p>;
  }

  return (
    <main>
      <HeaderDashboard />
      <section className={styles.flex}>
        <h1>Bienvenue Sur Odast!</h1>

        <div className={`${styles.content} flex flex-col gap-3`}>
          <h3>c'est quoi Odast</h3>
          <p>
            ODAST est une plateforme d’analyse des ressources en eau et un tableau de bord de suivi et de prévision de la sécheresse. Elle fournit des informations exploitables à partir de données environnementales en temps réel pour soutenir une gestion durable de l’eau.
          </p>
        </div>

        <div className={styles.btns}>
          <h3>Naviguez mes analyse:s</h3>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/tab1" className={styles.btn}>
              Prevision de la séchresses
            </Link>
            <Link href="/dashboard/tab2" className={styles.btn}>
              Analytiques de Barrages

            </Link>
            <Link href="/dashboard/tab3" className={styles.btn}>
             Analytiques de sources D'eau
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
