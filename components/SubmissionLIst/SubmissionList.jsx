"use client";

import React, { useState } from "react";
import styles from "./submission.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function SubmissionsList({ submissions }) {
  const [expandedId, setExpandedId] = useState(null);
  const [submissionList, setSubmissionList] = useState(submissions);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Function to handle the action (approve/reject)
  const handleAction = async (userId, action) => {
    const res = await fetch("/api/submissions/respond", {
      method: "POST",
      body: JSON.stringify({ userId, action }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      alert("Action completed!");
      setSubmissionList(submissionList.filter((s) => s._id !== userId));
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div>
      {submissions.length === 0 && (
        <p className={styles.no}>No submissions found.</p>
      )}

      {submissionList.map((submission) => (
        <div key={submission._id} className={styles.submissionCard}>
          <div className={styles.flexDIv}>
            <p>
              <span className="text-gray-400">Name:</span> {submission.fullName}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {submission.email}
            </p>
            <p>
              <span className="text-gray-400">Role:</span>{" "}
              {submission.profession || "Not provided"}
            </p>
          </div>

          <div className={`${styles.flexDIv} my-4`}>
            <button
              onClick={() => toggleExpand(submission._id)}
              className={`${styles.toggleButton} text-gray-400`}
            >
              <span className="text-gray-400">Message:</span>{" "}
              {expandedId === submission._id
                ? "Hide Message ︿"
                : "Show Message ﹀"}
            </button>

            {expandedId === submission._id && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.messageBox}
                >
                  <p>{submission.message || "No message provided."}</p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className={styles.btns}>
            <button onClick={() => handleAction(submission._id, "approve")}>
              Approve
            </button>

            <button onClick={() => handleAction(submission._id, "reject")}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
