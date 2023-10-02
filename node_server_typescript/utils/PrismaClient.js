import { PrismaClient } from "@prisma/client";

let prismaInstance = null;

const getPrismaInstance = () => {
  return (prismaInstance = !prismaInstance ? new PrismaClient() : null);
};

export default getPrismaInstance;
