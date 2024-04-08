// httpOnlyCookieValidity - setting the validity for http only cookie
export const httpOnlyCookieValidity = () => {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days validity
};

// saveAccessTokenToCookie - this method saved the access token to the http only cookie
export const saveAccessTokenToCookie = (role, res, token) => {
  return res.cookie(`ACCESS_TOKEN_PETHEEDS`, token, {
    httpOnly: true,
    expires: httpOnlyCookieValidity(),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });
};

export const generateOtp = () => {
  const otp = Math.floor(Math.random() * 900000 + 100000);
  return otp;
};

