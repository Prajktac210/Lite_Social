// ✅ All imports at the top
import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import session from "express-session"
import cookieParser from "cookie-parser";

//api routes

import { signup ,login} from "./controllers/authanticationControl.js"; // ✅ named import

import responder from "./utils/responder.js"; // ✅ utility

//databse
import connectdb from "./config/connectdb.js"; // ✅ database



const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Middleware
app.use(cors({
  origin: [],
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 ,
      httpOnly:true
    }
      })
);


// ✅ Routes
app.post("/api/signup", signup);
app.post("/api/login", login);


app.get("/health", (req, res) => {
  return responder(res, null, 200, true, "server is healthy");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`App is started on localhost ${PORT}`);
  connectdb();
});
