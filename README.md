# OCP Dashboard – User Submission Approval System

This project is a secure user submission and review system built with **Next.js**, **MongoDB**, and **Nodemailer**. It allows admins to **review user applications**, **approve or decline them**, and automatically **send login credentials via email**.

---

## 🧠 Problem It Solves

Managing new users or applicants in a dashboard is a manual and error-prone task. This system streamlines the process by:

- Automatically generating passwords on approval.
- Letting users log in with their own email.
- Sending approved users their login credentials via email.
- Informing declined users politely via email.
- Marking users as reviewed to avoid double processing.

---

## 🔧 Technologies Used

| Tech         | Purpose                                       |
|--------------|-----------------------------------------------|
| Next.js      | Fullstack React framework (API + frontend)    |
| MongoDB      | Stores user data (with reviewed/approved flags) |
| bcryptjs     | Securely hashes user passwords                |
| Nodemailer   | Sends approval/rejection emails via Gmail     |

---

## ✨ Features

- 📋 Admin interface to **approve/decline** users.
- 🔐 Automatically generate a **secure password**.
- ✉️ Email users on approval/rejection.
- ✅ Flags users as reviewed/approved in MongoDB.
- 🧪 Fully testable in **local development** and **Vercel deployment**.

---

## 🗃 Project Structure

```bash
/app/api/submissions/route.js   # Handles initial user submission
/app/api/submissions/respond.js # Handles approval/rejection actions
/lib/mongo.js                   # Connects to MongoDB
.env                            # Stores environment secrets (email login, DB URI)
````

---

## 🔑 Key Concepts Explained

### 1. `connectToDB()`

This function connects your Next.js app to a MongoDB instance using `mongodb` Node.js driver.

### 2. User Object Structure

Each user document in MongoDB includes:

```json
{
  "_id": ObjectId,
  "email": "example@gmail.com",
  "password": "hashed-password",
  "reviewed": false,
  "approved": false
}
```

### 3. Generating Password

A secure random password is generated like this:

```js
Math.random().toString(36).slice(-8)
```

### 4. Hashing Password

Using `bcryptjs` to securely hash the password before storing it in the database:

```js
const hashed = await bcrypt.hash(password, 10);
```

### 5. Sending Email

We use Nodemailer with a Gmail account to notify users:

```js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
```

### 6. Environment Variables

Stored in `.env` file:

```env
MONGODB_URI=mongodb+srv://your-connection-string
MAIL_USER=your@email.com
MAIL_PASS=your-app-password
```

---

## ⚙️ How It Works

### Admin Flow

1. Admin clicks **Approve** or **Decline** in the dashboard.
2. `/api/submissions/respond` runs on server:

   * If approved: generates password, hashes it, updates DB, emails the user.
   * If declined: updates DB and emails rejection.
3. Response sent back with `{ success: true }`.

---

## 🚀 Deploying to Vercel

To redeploy after any update:

```bash
# Push to main branch or
vercel --prod
```

Make sure you add environment variables in the Vercel dashboard under **Project Settings > Environment Variables**.

---

## 🧪 Local Testing

### 1. Clone the repo

```bash
git clone https://github.com/yourname/ocp-dashboard.git
cd ocp-dashboard
```

### 2. Add `.env` file

```env
MONGODB_URI=your-local-or-cloud-mongodb-uri
MAIL_USER=your@gmail.com
MAIL_PASS=your-app-password
```

### 3. Run the project

```bash
npm install
npm run dev
```

---

## 🛡 Security Notes

* Gmail requires an **App Password** if 2FA is enabled.
* Never commit your `.env` file to GitHub.
* Passwords are never stored in plain text — always hashed.

---

## 💡 Future Improvements

* Add user-facing login interface.
* Admin dashboard with visual UI for status filters.
* Rate-limiting and spam protection on submissions.
* Logging and audit history of actions.

---

## 🙌 Credits

Built with ❤️ by [Mohssine Chedgane](https://github.com/muhsench)
```

