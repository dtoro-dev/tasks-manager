import { Request, Response } from "express";
import { State } from "@prisma/client";
import { StateService } from "./state.service";

export const getStates = async (req: Request, res: Response) => {
  try {
    const stateService: StateService = new StateService();
    const states: State[] = await stateService.getStates();

    res.json(states);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estados" });
  }
};

export const getState = async (req: Request, res: Response) => {
  try {
    const stateService: StateService = new StateService();
    const state: State | null = await stateService.getState(Number(req.params.id));

    if (!state) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }

    res.json(state);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el estado" });
  }
};

export const createState = async (req: Request, res: Response) => {
  try {
    const stateService: StateService = new StateService();
    const newState: State = await stateService.createState(req.body);

    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el estado" });
  }
};

export const createStateMany = async (req: Request, res: Response) => {
  try {
    const stateService: StateService = new StateService();
    const result = await stateService.createStateMany(req.body);

    res.status(201).json({ count: result.count });
  } catch (error) {
    res.status(500).json({ message: "Error al crear los estados" });
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const stateService: StateService = new StateService();
    const updatedState: State = await stateService.updateState(Number(req.params.id), req.body);

    res.json(updatedState);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado" });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const stateService: StateService = new StateService();
    const deletedState: State = await stateService.deleteState(Number(req.params.id));

    res.json(deletedState);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el estado" });
  }
};
