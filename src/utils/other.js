// httpOnlyCookieValidity - setting the validity for http only cookie
export const httpOnlyCookieValidity = () => {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days validity
  // return new Date(currentDate.getTime() + 2 * 60 * 1000); // 2 minutes validity
};

// saveAccessTokenToCookie - this method saved the access token to the http only cookie
export const saveAccessTokenToCookie = (res, token) => {
  return res.cookie(`ACCESS_TOKEN_PETHEEDS`, token, {
    httpOnly: true,
    expires: httpOnlyCookieValidity(), // Ensure this function returns a valid Date object
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    secure: process.env.NODE_ENV != "development", // Ensure secure attribute is true in production
  });
};


export const generateOtp = () => {
  const otp = Math.floor(Math.random() * 900000 + 100000);
  return otp;
};

