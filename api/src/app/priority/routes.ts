import { Router } from "express";

const router = Router();

import {
  getPriorities,
  getPriority,
  createPriority,
  createPriorityMany,
  updatePriority,
  deletePriority,
} from "./priority.controller";

router.get("/", getPriorities);
router.get("/:id", getPriority);
router.post("/", createPriority);
router.post("/many", createPriorityMany);
router.put("/:id", updatePriority);
router.delete("/:id", deletePriority);

export { router };
