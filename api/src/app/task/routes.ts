import { Router } from "express";
import {
  getTasks,
  createTask,
  createTaskMany,
  getTask,
  updateTask,
  deleteTask,
  getTaskCounts,
  getTaskAnnually,
  getTaskHistory,
} from "./task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/count", getTaskCounts);
router.get("/chart/annually", getTaskAnnually);
router.get("/chart/history", getTaskHistory);
router.get("/:id", getTask);
router.post("/", createTask);
router.post("/many", createTaskMany);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export { router };
