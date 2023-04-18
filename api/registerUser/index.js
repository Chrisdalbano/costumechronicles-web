const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const connectionString = process.env.NODE_ENV === "production"
  ? process.env.MYSQL_CONNECTION_STRING
  : process.env.LOCAL_MYSQL_CONNECTION_STRING;

const connectionConfig = {
  connectionString: connectionString,
  ssl: {
    ca: fs.readFileSync(
      path.join(__dirname, "DigiCertGlobalRootCA.crt.pem")
    ),
  },
};

module.exports = async function (context, req) {
  const { username, email, password } = req.body;

  if (!password || password.trim() === "") {
    context.res = {
      status: 400,
      body: "Password cannot be empty.",
    };
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Connecting to the database...");
    const connection = await mysql.createConnection(connectionConfig);
    console.log("Connected to the database");

    const [rows] = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    await connection.end();

    context.res = {
      status: 200,
      body: "User registered successfully!",
    };
  } catch (error) {
    console.error("Error:", error);
    context.res = {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: true,
        message: "Error: " + error.message,
      }),
    };
  }
};
