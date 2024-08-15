import { Router } from "express";

const router = Router();

import {
  getStates,
  getState,
  createState,
  createStateMany,
  updateState,
  deleteState,
} from "./state.controller";

router.get("/", getStates);
router.get("/:id", getState);
router.post("/", createState);
router.post("/many", createStateMany);
router.put("/:id", updateState);
router.delete("/:id", deleteState);

export { router };
