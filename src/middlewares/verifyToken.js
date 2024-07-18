import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const cookies = req?.cookies;

    const access_token =
      cookies?.ACCESS_TOKEN_PETHEEDS || cookies?.ACCESS_TOKEN_PETHEEDS_CLIENT;
 console.log(access_token)
    if (access_token === null) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access! Please Login !",
      });
    }

    jwt.verify(
      access_token,
      process.env.JWT_SECRET_KEY,
      async (error, user) => {
        // console.log(user);

        try {
          if (error) {
            return res.status(403).json({
              success: false,
              message: `Unauthorized Access ! Please Login !`,
            });
          }

          req.userId = user?.userId;

          return next();
        } catch (error) {
          return res.status(403).json({
            success: false,
            message: error.message || error || "Internal server error!!",
          });
        }
      }
    );
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error?.message || error || "Internal server error!!",
    });
  }
};
