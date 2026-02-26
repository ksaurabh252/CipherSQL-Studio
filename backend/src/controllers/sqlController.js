const { Client } = require("pg");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Attempt = require("../models/Attempt.model");
require("dotenv").config();

// 1. PostgreSQL Setup
const pgClient = new Client({
  connectionString:
    "postgresql://postgres:Gaya%40123@localhost:5432/sandbox_db",
});

pgClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("PG Connection Error", err));

// 2. Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- EXECUTE QUERY ---
const executeQuery = async (req, res) => {
  const { sql, username, assignmentTitle } = req.body;

  if (!sql || /drop|delete|truncate/i.test(sql)) {
    return res.status(400).json("Unsafe query found. Only SELECT is allowed.");
  }

  let isSuccess = false;

  try {
    const result = await pgClient.query(sql);
    isSuccess = true;
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (username && assignmentTitle) {
      try {
        await Attempt.create({
          username,
          assignmentTitle,
          sqlQuery: sql,
          success: isSuccess,
        });
        console.log("Attempt Saved!");
      } catch (saveError) {
        console.error("Failed to save attempt history", saveError);
      }
    }
  }
};

// --- GET HINT ---
const getHint = async (req, res) => {
  try {
    const { question, userQuery } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a helpful SQL Tutor.
      
      The student's goal is: "${question}".
      
      The student has currently typed this code: "${userQuery || ""}".

      Task:
     Instructions:
      1. Analyze the "Current Code".

      2. If the code contains "DROP", "DELETE", or "TRUNCATE", warn them immediately that this is dangerous or incorrect for a SELECT task.

      3. If they wrote "SELECT * FROM", tell them to add the table name.

      4. If the code is empty, suggest the 'SELECT' keyword.
      
      5. If there is a syntax error, point it out gently.

      6. If the code is just irrelevant (like "HELLO"), say: "That is not a SQL command."

      7. If the code is safe but wrong, guide them towards the solution for "${question}".
      
      Constraint:
      - Give a very short hint (max 2 sentences).
      - Do NOT reveal the full answer.
      - Focus on the *next step* only.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const hintText = response.text();

    res.json({ hintText });
  } catch (error) {
    console.error("AI Error:", error);
    res.json({
      hintText:
        "Hint service is currently unavailable. Try checking your syntax.",
    });
  }
};

module.exports = { executeQuery, getHint };
