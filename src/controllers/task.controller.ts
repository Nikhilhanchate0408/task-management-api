import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskSchema, UpdateTaskSchema } from '../schemas/task.schema';
import { CreateTaskInput } from '../interfaces/task.interface';

const service = new TaskService();

export class TaskController {
  getAll(req: Request, res: Response, next: NextFunction) {
    try { res.json(service.getAllTasks()); }
    catch (e) { next(e); }
  }

  getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {     
    res.json(service.getTaskById(req.params.id)); }
    catch (e) { next(e); }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CreateTaskSchema.parse(req.body);
      res.status(201).json(service.createTask(data));
    } catch (e) { next(e); }
  }

  update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
    if (!id || Array.isArray(id)) throw new Error('Invalid task id');

    const rawData = UpdateTaskSchema.parse(req.body);
    const data = Object.fromEntries(
      Object.entries(rawData).filter(([, value]) => value !== undefined)
    ) as Partial<CreateTaskInput>;

    res.json(service.updateTask(id, data));
    } catch (e) { next(e); }
  }

  delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      service.deleteTask(req.params.id);
      res.status(204).send();
    } catch (e) { next(e); }
  }
}