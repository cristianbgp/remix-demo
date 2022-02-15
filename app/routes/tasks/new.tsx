import { ActionFunction, Form, redirect, useActionData } from "remix";
import { db } from "~/services/db.server";

type TaskErrors = {
  title?: boolean;
  server?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const done = Boolean(formData.get("done"));

  let errors: TaskErrors = {};
  if (!title) errors.title = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  try {
    await db.task.create({
      data: {
        title,
        description,
        done,
      },
    });
    return redirect("/tasks");
  } catch (error) {
    errors.server = true;
    return errors;
  }
};

export default function NewPage() {
  const errors = useActionData<TaskErrors>();

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center bg-slate-300 p-4">
      <h1 className="mb-6 text-center text-4xl text-gray-800">
        Create a new task
      </h1>
      {errors?.server && <span>"Something went wrong"</span>}
      <Form method="post" className="flex flex-col">
        <label
          htmlFor="title"
          className="mb-2 block text-lg font-bold text-gray-700"
        >
          Title
        </label>
        {errors?.title && <span>Title is required</span>}
        <input
          type="text"
          id="title"
          name="title"
          className="rounded-lg p-2 text-xl"
        />
        <label
          htmlFor="description"
          className="mb-2 mt-4  block text-lg font-bold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="rounded-lg p-2 text-xl min-h-[12rem]"
        />
        <label
          htmlFor="title"
          className="mb-2 mt-4 block text-lg font-bold text-gray-700"
        >
          Completed?
        </label>
        <input type="checkbox" id="done" name="done" className="h-6 w-6" />
        <button
          type="submit"
          className="my-4 rounded-lg bg-gray-800 px-1 py-2 text-white"
        >
          Create
        </button>
      </Form>
    </div>
  );
}
