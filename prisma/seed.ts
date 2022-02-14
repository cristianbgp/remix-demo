import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all([
    db.task.createMany({
      data: [
        {
          title: "First task",
          description: "First task description",
        },
        {
          title: "Second task",
          description: "Second task description",
        },
        {
          title: "Third task",
          description: "Third task description",
          done: true,
        },
        {
          title: "Fourth task",
          description: "Fourth task description",
          done: true,
        },
        {
          title: "Fifth task",
          description: "Fifth task description",
        },
      ],
    }),
  ]);
}

seed();
