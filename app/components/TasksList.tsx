import { Task } from "@prisma/client";

export type TasksListProps = {
  tasks: Task[];
};

export function TasksList({ tasks }: TasksListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>{task.title}</p>
          {/* <p>{task.description}</p> */}
        </li>
      ))}
    </ul>
  );
}
