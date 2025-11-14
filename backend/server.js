import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server running successfully");
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5013");
});