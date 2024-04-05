import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";
import connectDB from "./src/config/db.js";
import { error } from "./src/middlewares/error.js";

// @@Desc:-----Handling uncaught Exception-----------------
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(`PETHEEDS-Error: ${err.message}`);
  console.log(
    `PETHEEDS-shutting down the server for handling uncaught exception`
  );
});

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
import enquirySubjectRoutes from "./src/routes/enquiryRequest/enquirySubject.js";
import requestCallbackRoutes from "./src/routes/enquiryRequest/callbackRequests.js";
import blogCategoryRoutes from "./src/routes/blog/blogCategory.js";
import blogRoutes from "./src/routes/blog/blog.js";
import subjectRoutes from "./src/routes/subject.js";
import productsRoutes from "./src/routes/product.js";
import bannerRoutes from "./src/routes/banner.js";
import appointmentRoutes from "./src/routes/appointment.js";

// @@Desc:-----------------route section-----------------
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/subject", enquirySubjectRoutes);
app.use("/api/v1/callbackRequest", requestCallbackRoutes);
app.use("/api/v1/blogCategory", blogCategoryRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/product", productsRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/", (req, res) => {
  res.send("--------WELCOME TO PETHEEDS---------");
});

app.use(error);
app.listen(PORT, () => {
  console.log(
    chalk.bgMagentaBright(`Server Started and Running at PORT ${PORT}`)
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log(`PETHEEDS-Shutting down the server for ${err.message}`);
  console.log(
    `PETHEEDS-shutting down the server for unhandle promise rejection`
  );

  server.close(() => {
    process.exit(1);
  });
});
