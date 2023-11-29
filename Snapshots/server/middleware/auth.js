import jwt from "jsonwebtoken";

// If the user wants to like the post
// click the like button => auth middleware (if the logic is correct next()) => like controller...

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    }
    console.log("Token: ", token);
    console.log("Decoded data: ", decodedData);
    console.log("req.userId: ", req.userId);
    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
