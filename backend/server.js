import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "YouTube Clone API Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
