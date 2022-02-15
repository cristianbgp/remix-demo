import { LoaderFunction, Outlet } from "remix";
import { json } from "stream/consumers";
import NavBar from "~/components/NavBar";
import { db } from "~/services/db.server";

export const loader: LoaderFunction = async () => {
  const allPromise = db.task.count();
  const completedPromise = db.task.count({ where: { done: true } });
  const activePromise = db.task.count({ where: { done: false } });

  const [allCount, completedCount, activeCount] = await Promise.all([
    allPromise,
    completedPromise,
    activePromise,
  ]);

  return {
    allCount,
    completedCount,
    activeCount,
  };
};

export default function RootIndex() {
  return (
    <div className="flex">
      <NavBar />
      <Outlet />
    </div>
  );
}
