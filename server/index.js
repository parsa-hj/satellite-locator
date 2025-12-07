import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Donation Tracker API is running!");
});

app.listen(port, () => {
  console.log(`ISS Locator app listening on port ${port}`);
});
