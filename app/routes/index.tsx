import { Task } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { TasksList } from "~/components/TasksList";
import { db } from "~/services/db.server";

type LoaderData = {
  tasks: Task[];
};

export const loader: LoaderFunction = async () => {
  const tasks = await db.task.findMany();
  return { tasks };
};

export default function Index() {
  const { tasks } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <TasksList tasks={tasks} />
    </div>
  );
}
