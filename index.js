import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

app.get("/api/first", (req, res) => {
  res.json({ message: "Hello" });
});

app.get("/api/second", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(4000, () => {
  console.log("App is running in port 4000");
});
