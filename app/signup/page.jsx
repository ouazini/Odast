import React from "react";
import styles from "./app.module.css";
import { HeaderHome, SignupForm } from "@/components/index";

const signup = () => {
  return (
    <>
      <HeaderHome />
      <section className={styles.signup}>
        <div className={styles.left_content}>
          <span className="text-gray-500 text-sm">Nouvel utilisateur?</span>
          <h1>Inscrivez-vous maintenant</h1>
        </div>
        {/* Signup form */}
        <SignupForm />
      </section>
    </>
  );
};

export default signup;
