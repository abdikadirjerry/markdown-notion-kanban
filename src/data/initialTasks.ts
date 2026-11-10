import type { KanbanTask } from "../types/kanban";

export const INITIAL_TASKS: KanbanTask[] = [
  {
    id: "task-1",
    title: "Architect Full-Stack Authentication Flow",
    description:
      "Implement JWT session cookies with HttpOnly flags and refresh token rotation in Node.js backend.",
    column: "in_progress",
    tag: "Engineering",
    priority: "High",
  },
  {
    id: "task-2",
    title: "Redesign Landing Page Typography",
    description:
      "Update font scale to JetBrains Mono for telemetry readouts and Inter for editorial body copy.",
    column: "backlog",
    tag: "Design",
    priority: "Medium",
  },
  {
    id: "task-3",
    title: "Configure PostgreSQL Connection Pooling",
    description:
      "Tune Prisma connection pool parameters for high-throughput microservice request handlers.",
    column: "completed",
    tag: "Engineering",
    priority: "High",
  },
  {
    id: "task-4",
    title: "Research WebRTC Signaling Protocols",
    description:
      "Explore peer-to-peer data channel encryption and STUN/TURN server configurations.",
    column: "backlog",
    tag: "Research",
    priority: "Low",
  },
];
