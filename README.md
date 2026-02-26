---

# CipherSQL Studio

This is a web-based SQL learning platform. Students can practice SQL queries, get real-time results, and receive AI-powered hints.

## 1. Technology Choices

I used these technologies to build the project:

*   **Frontend: React.js**
    *   Used to build the user interface.
    *   It makes the app fast and easy to manage using components.
*   **Styling: SCSS (Sass)**
    *   Used for styling the website.
    *   It helps in using variables (for colors) and nesting rules, which is better than plain CSS.
*   **Backend: Node.js & Express**
    *   Used to create the server and API.
    *   It handles requests from the frontend and connects to databases.
*   **Sandbox Database: PostgreSQL**
    *   Used to execute the SQL queries written by the student.
    *   It provides a real SQL environment.
*   **Persistence Database: MongoDB**
    *   Used to save User Data (Login/Signup) and their Query History.
*   **AI Integration: Google Gemini**
    *   Used to provide smart hints when a student gets stuck.

---

## 2. Environment Variables

You need to create a `.env` file inside the **`backend`** folder with the following keys:

```text
PORT=4000
MONGO_URI=mongodb://localhost:27017/ciphersql_db
PG_URI=postgresql://postgres:YOUR_PASSWORD@localhost:5432/sandbox_db
GEMINI_API_KEY=YOUR_GOOGLE_API_KEY
```

> **Note:** Replace `YOUR_PASSWORD` with your PostgreSQL password and `YOUR_GOOGLE_API_KEY` with your Gemini Key.

---

## Project Structure

backend/
frontend/

## 3. Project Setup Instructions

Follow these steps to run the project on your computer.

### Step 1: Database Setup

1.  Make sure **MongoDB** is running locally.
2.  Make sure **PostgreSQL** is running.
3.  Create a database named `sandbox_db` in PostgreSQL.
4.  Create a table named `users` in `sandbox_db` and insert some dummy data.

### Step 2: Backend Setup

1.  Open a terminal and go to the backend folder:
    ```bash
    cd backend
    ```
2.  Install the required libraries:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
    _(You should see "Server running on port 4000", "Connected to MongoDB", and "Connected to PostgreSQL")_

### Step 3: Frontend Setup

1.  Open a **new** terminal and go to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install the required libraries:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm run dev
    ```
    _(The browser will open automatically at http://localhost:3000)_

---
