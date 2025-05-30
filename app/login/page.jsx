import React from "react";
import styles from "./app.module.css";
import { HeaderHome, LoginForm } from "@/components/index";

const login = () => {
  return (
    <>
      <HeaderHome />
      <section className={styles.signup}>
        <div className={styles.left_content}>
          <span className="text-gray-500 text-sm">Welcome Back</span>
          <h1>Connectez-vous maintenant</h1>
        </div>
        {/* Login form */}
        <LoginForm />
      </section>
    </>
  );
};

export default login;
