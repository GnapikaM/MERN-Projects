import jwt from "jsonwebtoken";

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
