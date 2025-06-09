const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const productRouters = require("./routes/product.route.js");
app.use("/api/products", productRouters);

const userRouters = require("./routes/user.route.js")
const authRouters = require("./routes/auth.route.js")

app.use("/auth", authRouters);
app.use("/api/users", userRouters);
const orderpay = require("./routes/orderpay.js");
app.use('/orderpay', orderpay);

const adminProductRouters = require("./routes/adminProduct.route.js");
app.use("/api/admin/products", adminProductRouters);

const cartRoute = require("./routes/cart.route.js");
app.use("/api/cart", cartRoute);

const cartItemRouter = require("./routes/cartItem.route.js")
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.route.js");
app.use("/api/orders", orderRouter);

const refundRouter = require("./routes/refund.js");
app.use("/api/refund", refundRouter);

const reviewRouter = require("./routes/review.route.js");
app.use("/api/reviews", reviewRouter);

const mailRouter = require("./routes/mail.js");
app.use("/api/mail", mailRouter);

const categoryRouter= require("./routes/category.route.js")
app.use("/api/category", categoryRouter)
const ratingRouter = require("./routes/rating.route.js");
app.use("/api/ratings", ratingRouter);

const adminOrderRouter = require("./routes/adminOrder.route.js");
app.use("/api/admin/orders", adminOrderRouter);


const image = require("./routes/upload.js");
app.use("/api/images", image);
module.exports = app;
