import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskInput, UpdateTaskInput } from '../interfaces/task.interface';

// In-memory store (no database needed)
const tasks: Task[] = [];

export class TaskRepository {
  findAll(): Task[] {
    return tasks;
  }

  findById(id: string): Task | undefined {
    return tasks.find(t => t.id === id);
  }

  create(input: CreateTaskInput): Task {
    const task: Task = {
      id: uuidv4(),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  }

  update(id: string, input: UpdateTaskInput): Task | undefined {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    
    const existing = tasks[index]!;

    const updatedTask: Task = {
      id: existing.id,
      title: input.title ?? existing.title,
      description: input.description ?? existing.description,
      status: input.status ?? existing.status,
      priority: input.priority ?? existing.priority,
      dueDate: input.dueDate ?? existing.dueDate,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = updatedTask;
    return tasks[index];
  }

  delete(id: string): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}
