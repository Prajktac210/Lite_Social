// ✅ All imports at the top
import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import { signup } from "./controllers/authanticationControl.js"; // ✅ named import
import responder from "./utils/responder.js"; // ✅ utility
import connectdb from "./config/connectdb.js"; // ✅ database



const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.post("/api/signup", signup);

app.get("/health", (req, res) => {
  return responder(res, null, 200, true, "server is healthy");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`App is started on localhost ${PORT}`);
  connectdb();
});
