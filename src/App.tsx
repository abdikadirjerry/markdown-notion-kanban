import React, { useState } from "react";
import { INITIAL_TASKS } from "./data/initialTasks";
import type { KanbanTask, TaskColumn } from "./types/kanban";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);

  const handleMoveTask = (id: string, column: TaskColumn) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column } : t)));
  };

  const handleAddTask = (newTaskData: Omit<KanbanTask, "id">) => {
    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      ...newTaskData,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col selection:bg-stone-900 selection:text-white">
      <Header />
      <KanbanBoard
        tasks={tasks}
        onMoveTask={handleMoveTask}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default App;
