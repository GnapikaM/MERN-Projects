// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;
//     let decodedData;
//     if (token && isCustomAuth) {
//       decodedData = jwt.verify(token, "test");
//       req.userId = decodedData?.id;
//       next();
//     } else {
//       res.status(401).json({ message: "Authentication failed" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

// export default auth;


import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
      next();
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired. Please log in again." });
    } else {
      console.error(error);
      res.status(401).json({ message: "Authentication failed" });
    }
  }
};

export default auth;
