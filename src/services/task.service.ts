import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskInput, UpdateTaskInput } from '../interfaces/task.interface';

const repo = new TaskRepository();

export class TaskService {
  getAllTasks() { return repo.findAll(); }

  getTaskById(id: string) {
    const task = repo.findById(id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  createTask(input: CreateTaskInput) { return repo.create(input); }

  updateTask(id: string, input: UpdateTaskInput) {
    const task = repo.update(id, input);
    if (!task) throw new Error('Task not found');
    return task;
  }

  deleteTask(id: string) {
    const deleted = repo.delete(id);
    if (!deleted) throw new Error('Task not found');
  }
}