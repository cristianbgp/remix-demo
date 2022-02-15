import { Task } from "@prisma/client";
import { Form } from "remix";

export type TasksListProps = {
  tasks: Task[];
};

function TaskCard({ task }: { task: Task }) {
  return (
    <li className="group mb-4 flex w-[20rem] flex-col rounded-lg bg-white p-4">
      <div className="flex justify-between">
        <p className="max-w-[90%] text-lg font-semibold">{task.title}</p>
        <Form method="post">
          <input type="hidden" value={task.id} name="id" />
          <button
            type="submit"
            className="hidden text-xl font-bold group-hover:block"
            style={{ transform: "rotate(45deg)" }}
          >
            +
          </button>
        </Form>
      </div>
      {task.description && (
        <>
          <hr />
          <p className="mt-2">{task.description}</p>
        </>
      )}
    </li>
  );
}

export function TasksList({ tasks }: TasksListProps) {
  return (
    <ul className="flex flex-col items-center justify-center">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  );
}
