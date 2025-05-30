"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import styles from "./form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.flex_col}>
          <h2>
            Votre email <span className="text-red-600">*</span>
          </h2>
          <Input
            type="email"
            placeholder="johndoe@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.flex_col}>
          <h2>
            Mot de pass <span className="text-red-600">*</span>
          </h2>
          <Input
            type="password"
            placeholder="*****"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          className={styles.submit}
          type="submit"
          value={loading ? "Loading..." : "Envoyer"}
          disabled={loading}
        />
      </form>

      <div className={styles.acc}>
        <h1>
          Pas encore de compte ?{" "}
          <Link href="/signup" className={styles.link}>
            inscrivez-vous maintenant
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default LoginForm;
