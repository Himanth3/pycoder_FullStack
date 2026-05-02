# Deployment Guide 🚀

This guide provides step-by-step instructions for deploying your **Django Backend** to [Render](https://render.com/) and your **React Frontend** to [Vercel](https://vercel.com/).

---

## 1. Backend Deployment (Render) 🐍

### Prerequisites
*   A Render account.
*   Your project pushed to GitHub.

### Step 1: Create Database
1.  Go to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **PostgreSQL**.
3.  **Name:** `pycoder-db` (or similar).
4.  **Region:** Choose the one closest to you (e.g., Singapore, Frankfurt).
5.  **Instance Type:** **Free** plan.
6.  Click **Create Database**.
7.  **IMPORTANT:** Once created, scroll down to the **Connections** section and copy the **Internal Database URL** (starts with `postgres://...`). You will need this for the backend.

### Step 2: Create Web Service (Django)
1.  Click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  **Name:** `pycoder-backend` (or similar).
4.  **Region:** Same as your database.
5.  **Branch:** `main` (or your working branch).
6.  **Runtime:** **Python 3**.
7.  **Build Command:** `./backend/build.sh`
    *   *Note: Ensure you have a `build.sh` in your backend folder that installs requirements, collects static files, and runs migrations.*
8.  **Start Command:** `cd backend && gunicorn config.wsgi:application`
9.  **Instance Type:** **Free** plan.

### Step 3: Environment Variables
Scroll down to the **Environment Variables** section and add the following:

| Key | Value | Description |
| :--- | :--- | :--- |
| `PYTHON_VERSION` | `3.10.0` | Matches your local development version. |
| `SECRET_KEY` | `qz0AXYuetaNAtR81QRnMwO7AfYctgKtMiiyRXm4Fq3tgtJKYxHdk8nevQYK` | **Generated for you.** Keep this secret! |
| `DEBUG` | `False` | **CRITICAL** for production security. |
| `ALLOWED_HOSTS` | `*` | Allows traffic from Render. Can be updated to your specific `onrender.com` domain later. |
| `DATABASE_URL` | *(Paste Internal DB URL)* | The URL you copied from Step 1. |
| `CORS_ALLOWED_ORIGINS`| `http://localhost:5173` | **Temporary.** You will update this after deploying the frontend. |

10. Click **Create Web Service**.

### Step 4: Verification
*   Wait for the deployment to finish.
*   Render will provide a URL (e.g., `https://pycoder-backend-xp23.onrender.com`).
*   **Copy this URL.** You need it for the frontend.

---

## 2. Frontend Deployment (Vercel) ⚛️

### Step 1: Import Project
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.

### Step 2: Configuration
1.  **Framework Preset:** Vite (should be auto-detected).
2.  **Root Directory:** Click "Edit" and select `frontend`.
3.  **Build Settings:** Default is usually fine (`npm run build` / `dist`).

### Step 3: Environment Variables
Expand the **Environment Variables** section and add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://pycoder-backend.onrender.com/api/` | **Paste your Render Backend URL here.** <br>⚠️ **Must end with `/api/`** |

### Step 4: Deploy
1.  Click **Deploy**.
2.  Wait for the build to complete.
3.  Vercel will give you a domain (e.g., `https://pycoder-frontend.vercel.app`).
4.  **Copy this URL.**

---

## 3. Final Configuration 🔗

Now that you have your live Frontend URL, you need to tell the Backend to trust it.

1.  Go back to your **Render Dashboard** -> **Web Service**.
2.  Go to **Environment Variables**.
3.  Edit `CORS_ALLOWED_ORIGINS`.
4.  **Replace** the existing value (or append with a comma) with your new Vercel URL.
    *   **Value:** `https://pycoder-full-stack.vercel.app` (**CRITICAL:** Must NOT have a trailing `/`)
5.  **Save Changes**. Render will automatically redeploy your backend.

---

## ✅ API Endpoints
Once completely deployed, your API will be accessible at:
*   **Signup:** `POST https://[BACKEND_URL]/api/signup/`
*   **Login:** `POST https://[BACKEND_URL]/api/token/`
