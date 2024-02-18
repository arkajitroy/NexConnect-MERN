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

export const onBoardUser = async (req, res, next) => {
  try {
    const { name, email, about, displayPicture } = req.body;
    if (!email || !name || !displayPicture) return res.send("Email, Name and Image are required");

    const newUserPayload = {
      name,
      email,
      about,
      displayPicture,
    };

    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: newUserPayload,
    });

    return res.json({
      message: "Successfully Created User",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
