export type TaskColumn = "backlog" | "in_progress" | "completed";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  column: TaskColumn;
  tag: "Engineering" | "Design" | "Research";
  priority: "Low" | "Medium" | "High";
}
