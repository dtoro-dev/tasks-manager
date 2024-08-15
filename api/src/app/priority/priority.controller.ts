import { Request, Response } from "express";
import { Priority } from "@prisma/client";

import { PriorityService } from "./priority.service";

export const getPriorities = async (req: Request, res: Response) => {
  try {
    const priorityService: PriorityService = new PriorityService();
    const priorities: Priority[] = await priorityService.getPriorities();

    res.json(priorities);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las prioridades" });
  }
};

export const getPriority = async (req: Request, res: Response) => {
  try {
    const priorityService: PriorityService = new PriorityService();
    const priority: Priority | null = await priorityService.getPriority(
      Number(req.params.id)
    );

    if (!priority) {
      return res.status(404).json({ message: "Prioridad no encontrada" });
    }

    res.json(priority);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la prioridad" });
  }
};

export const createPriority = async (req: Request, res: Response) => {
  try {
    const priorityService: PriorityService = new PriorityService();
    const newPriority: Priority = await priorityService.createPriority(req.body);

    res.status(201).json(newPriority);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la prioridad" });
  }
};

export const createPriorityMany = async (req: Request, res: Response) => {
  try {
    const priorityService: PriorityService = new PriorityService();
    const result = await priorityService.createPriorityMany(req.body);

    res.status(201).json({ count: result.count });
  } catch (error) {
    res.status(500).json({ message: "Error al crear las prioridades" });
  }
};

export const updatePriority = async (req: Request, res: Response) => {
  try {
    const priorityService: PriorityService = new PriorityService();
    const updatedPriority: Priority = await priorityService.updatePriority(
      Number(req.params.id),
      req.body
    );

    res.json(updatedPriority);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la prioridad" });
  }
};

export const deletePriority = async (req: Request, res: Response) => {
  try {
    const priorityService: PriorityService = new PriorityService();
    const deletedPriority: Priority = await priorityService.deletePriority(
      Number(req.params.id)
    );

    res.json(deletedPriority);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la prioridad" });
  }
};
