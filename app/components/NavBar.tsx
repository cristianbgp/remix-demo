import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLoaderData, useLocation } from "remix";

const routes = [
  {
    path: "/tasks",
    name: "All",
  },
  {
    path: "/tasks/active",
    name: "Active",
  },
  {
    path: "/tasks/completed",
    name: "Completed",
  },
];

function Item({
  name,
  to,
  count,
}: {
  name: string;
  to: string;
  count: number;
}) {
  const location = useLocation();

  return (
    <li className="mt-6">
      <Link
        className={clsx(
          "flex min-w-full justify-between rounded-xl p-2 outline-none ring-gray-400 transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:ring-2",
          location.pathname === to && "bg-gray-200"
        )}
        to={to}
      >
        {name}
        <span className="rounded-lg bg-gray-300 px-2">{count}</span>
      </Link>
    </li>
  );
}

export default function NavBar() {
  const location = useLocation();
  const { allCount, completedCount, activeCount } = useLoaderData();
  const counts = {
    All: allCount as number,
    Active: activeCount as number,
    Completed: completedCount as number,
  };

  return (
    <nav className="flex min-h-screen min-w-[250px] flex-col justify-between border-r-2 p-6">
      <div>
        <h1 className="text-2xl">Tasks app</h1>
        <ul className="flex flex-col ">
          {routes.map((route) => (
            <Item
              key={route.path}
              name={route.name}
              to={route.path}
              count={counts[route.name]}
            />
          ))}
        </ul>
      </div>
      <Link
        className={clsx(
          "flex min-w-full items-center justify-center rounded-xl p-2 outline-none ring-gray-400 transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:ring-2",
          location.pathname === "/tasks/new" && "bg-gray-200"
        )}
        to="/tasks/new"
      >
        <span className="mr-2">+</span>
        <span>Create new task</span>
      </Link>
    </nav>
  );
}
