import jwt from "jsonwebtoken";

const generateToken = (userId, email,name, userType) => {
  return jwt.sign(
    {
      id: userId,
      email: email,
      name:name,
      userType: userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export default generateToken;
