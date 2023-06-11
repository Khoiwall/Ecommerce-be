const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require("express");
const DB = require("./db");
const AppError = require("./utils/appError");
var cors = require("cors");
dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;
app.use(cors());
DB.connectDB();
//Route file
const userRouter = require("./routes/authRouters");
const productRouter = require("./routes/productRouters");
const videoRouter = require("./routes/videoRouters");
//Midelware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//ROUTE
app.get("/", (req, res, next) => {
  return res.status(200).json("Ecommerce App 12344");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/videos", videoRouter);

app.use((err, req, res, next) => {
  console.log(err?.message);
  return res.status(err?.statusCode ? err?.statusCode : 404).send({
    status: err.status,
    message: err.type === "object" ? JSON.parse(err?.message) : err?.message,
    data: err?.response?.data,
  });
});

const server = app.listen(port, () =>
  console.log(`Example app listening on ${port} port !`)
);
