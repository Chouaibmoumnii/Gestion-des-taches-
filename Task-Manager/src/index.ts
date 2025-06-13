import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.routes";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
