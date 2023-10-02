import getPrismaInstance from "../../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("backend -> ", email);

    if (!email) {
      return res.json({
        message: "Email is Required!",
        status: false,
      });
    }

    const prisma = getPrismaInstance();
    const userInstance = await prisma.user.findUnique({
      where: { email },
    });

    if (!userInstance) {
      return res.json({
        message: "User Not Found!",
        status: false,
      });
    } else {
      return res.json({
        message: "User Found!",
        status: true,
        data: userInstance,
      });
    }
  } catch (error) {
    next(error);
  }
};
