import express from 'express';
import taskRoutes from './routes/task.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));