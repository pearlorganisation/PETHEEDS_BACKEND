import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";
import connectDB from "./src/config/db.js";
import { error } from "./src/middlewares/error.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5011;

// @@Desc:------MIDDLEWARES------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors(
    process.env.NODE_ENV === "development"
      ? {
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5010",
            "https://petheeds-frontend.vercel.app",
            "https://petheeds-admin.vercel.app",
            "https://petheeds.in",
            "https://admin.petheeds.in",
            "https://petheeds-frontend-apxx.vercel.app",
          ],
          credentials: true,
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          exposedHeaders: ["*", "Authorization"],
        }
      : {
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5010",
            "https://petheeds-frontend.vercel.app",
            "https://petheeds-admin.vercel.app",
            "https://petheeds.in",
            "https://admin.petheeds.in",
            "https://petheeds-frontend-apxx.vercel.app",
          ],
          credentials: true,
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          exposedHeaders: ["*", "Authorization"],
        }
  )
);

connectDB();

console.log();

//@@Desc:-----------------importing routers---------------
import authRoutes from "./src/routes/auth.js";
import requestCallbackRoutes from "./src/routes/enquiryRequest/callbackRequests.js";
import blogCategoryRoutes from "./src/routes/blog/blogCategory.js";
import blogRoutes from "./src/routes/blog/blog.js";
import subjectRoutes from "./src/routes/subject.js";
import productsRoutes from "./src/routes/product.js";
import appointmentRoutes from "./src/routes/appointment.js";
import bannerRoutes from "./src/routes/banner.js";
import categoryRoutes from "./src/routes/category.js";
import mailRoutes from "./src/routes/mail.js";
import brandRoutes from "./src/routes/brand.js";
import bookingRoutes from "./src/routes/booking.js";
import addressRoutes from "./src/routes/address.js";
import reviewRoutes from "./src/routes/review.js";
import couponCodeRoutes from "./src/routes/couponCode.js";
import morgan from "morgan";

// @@Desc:-----------------route section-----------------
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/subject", enquirySubjectRoutes);
app.use("/api/v1/callbackRequest", requestCallbackRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/blogCategory", blogCategoryRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/product", productsRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/couponCode", couponCodeRoutes);
app.use(error);

app.use("/", (req, res) => {
  res.send("--------WELCOME TO PETHEEDS---------");
});

app.listen(PORT, () => {
  console.log(
    chalk.bgMagentaBright(`Server Started and Running at PORT ${PORT}`)
  );
});

