"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "./form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  //
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    university: "",
    profession: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfessionChange = (value) => {
    setFormData((prev) => ({ ...prev, profession: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json({});

      if (res.ok) {
        router.push("/review-submission");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          university: "",
          profession: "",
          message: "",
        });
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert("An unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.flex_col}>
          <h2>
            Nom complet <span className="text-red-600">*</span>
          </h2>
          <Input
            type="text"
            name="fullName"
            placeholder="John doe"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.flex_col}>
          <h2>
            Votre email <span className="text-red-600">*</span>
          </h2>
          <Input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.flex_col}>
          <h2>
            Mot de pass <span className="text-red-600">*</span>
          </h2>
          <Input
            type="password"
            name="password"
            placeholder="*****"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.flex_col}>
          <h2>
            Votre université <span className="text-red-600">*</span>
          </h2>
          <Input
            type="text"
            name="university"
            placeholder="E.g: Fst Casablanca"
            required
            value={formData.university}
            onChange={handleChange}
          />
        </div>

        <div className={styles.flex_col}>
          <h2>
            Profession <span className="text-red-600">*</span>
          </h2>
          <Select
            required
            value={formData.profession}
            onValueChange={handleProfessionChange}
          >
            <SelectTrigger className={`${styles.font} w-full`}>
              <SelectValue placeholder="Vous êtes ?" />
            </SelectTrigger>
            <SelectContent className={styles.montreal}>
              <SelectGroup>
                <SelectLabel>Profession</SelectLabel>
                <SelectItem className={styles.montreal} value="prof">
                  Professeur
                </SelectItem>
                <SelectItem className={styles.montreal} value="chercheur">
                  Chercheur
                </SelectItem>
                <SelectItem className={styles.montreal} value="etudiant">
                  Étudiant(e)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.flex_col}>
          <h2>
            Votre message <span className="text-red-600">*</span>
          </h2>
          <Textarea
            name="message"
            placeholder="Quel est votre cas d'utilisation ?"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <input className={styles.submit} type="submit" value="Envoyer" />
      </form>

      <div className={styles.acc}>
        <h1>
          Vous avez déjà un compte ?{" "}
          <Link href="/login">Connectez-vous maintenant</Link>
        </h1>
      </div>
    </div>
  );
};

export default SignupForm;
