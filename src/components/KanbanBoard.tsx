import React, { useState } from "react";
import type { KanbanTask, TaskColumn } from "../types/kanban";

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onMoveTask: (id: string, column: TaskColumn) => void;
  onAddTask: (task: Omit<KanbanTask, "id">) => void;
}

const columnTitles: Record<TaskColumn, string> = {
  backlog: "Backlog Notes",
  in_progress: "In Progress",
  completed: "Completed",
};

const tagStyles: Record<string, string> = {
  Engineering: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Design: "bg-amber-50 text-amber-700 border-amber-200",
  Research: "bg-emerald-50text-emerald-700 border-emerald-200",
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onMoveTask,
  onAddTask,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState<"Engineering" | "Design" | "Research">(
    "Engineering",
  );
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, description, column: "backlog", tag, priority });
    setTitle("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-stone-900">
            Project Tasks & Notes
          </h2>
          <p className="text-xs text-stone-500">
            Manage sprints, technical specs, and deliverables.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-stone-900 hover:bg-stone-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
        >
          + New Task Note
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Create New Task Note
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Description / Markdown
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Note details..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Tag
                  </label>
                  <select
                    value={tag}
                    onChange={(e: any) => setTag(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-stone-900 text-white hover:bg-stone-800"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {(["backlog", "in_progress", "completed"] as TaskColumn[]).map(
          (col) => {
            const colTasks = tasks.filter((t) => t.column === col);
            return (
              <div
                key={col}
                className="bg-stone-100/70 border border-stone-200 rounded-2xl p-4 flex flex-col space-y-3"
              >
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {columnTitles[col]}
                  </h3>
                  <span className="text-[10px] font-bold bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white border border-stone-200/80 p-4 rounded-xl shadow-sm space-y-2 group"
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${tagStyles[task.tag] || "bg-stone-100 text-stone-700"}`}
                        >
                          {task.tag}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">
                          Priority: {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-stone-900">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="flex justify-end gap-1 pt-2 border-t border-stone-100">
                        {col !== "backlog" && (
                          <button
                            onClick={() =>
                              onMoveTask(
                                task.id,
                                col === "completed" ? "in_progress" : "backlog",
                              )
                            }
                            className="text-[10px] text-stone-500 hover:text-stone-900 px-2 py-1 rounded bg-stone-50 border border-stone-200"
                          >
                            ← Move Left
                          </button>
                        )}
                        {col !== "completed" && (
                          <button
                            onClick={() =>
                              onMoveTask(
                                task.id,
                                col === "backlog" ? "in_progress" : "completed",
                              )
                            }
                            className="text-[10px] text-stone-500 hover:text-stone-900 px-2 py-1 rounded bg-stone-50 border border-stone-200"
                          >
                            Move Right →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div className="text-center py-10 text-xs text-stone-400">
                      No tasks in this column.
                    </div>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
