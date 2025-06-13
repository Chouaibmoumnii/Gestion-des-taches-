import { Router } from "express";
import * as controller from "../controllers/tasks.controller";

const router = Router();

router.get("/", controller.getTasks);
router.post("/", controller.addTask);
router.delete("/:id", controller.removeTask);
router.patch("/:id", controller.updateStatus);

export default router;
