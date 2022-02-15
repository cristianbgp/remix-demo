import { Task } from "@prisma/client";
import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { TasksList } from "~/components/TasksList";
import { db } from "~/services/db.server";

type LoaderData = {
  tasks: Task[];
};

export const loader: LoaderFunction = async () => {
  const tasks = await db.task.findMany({ where: { done: false } });
  return { tasks };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  await db.task.delete({ where: { id: Number(id) } });

  return null;
};

export default function ActivePage() {
  const { tasks } = useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-slate-300 p-4">
      <h1 className="mb-6 text-center text-4xl">Active tasks</h1>
      <TasksList tasks={tasks} />
    </div>
  );
}
