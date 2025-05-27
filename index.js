const express = require("express");
const app = express();
const { connectToMongoDB } = require("./config/db");
const User = require("./routes/User");
const cors = require("cors");
const orderRoutes = require("./routes/Order");
const menuRoutes = require("./routes/Menu");
const Adduser = require("./routes/AddUser");
const deleteUser = require("./routes/AddUser");
const patchOrder = require("./routes/Order");
const companyOrders = require("./routes/Order");
const companyRoutes =  require('./routes/company');
const imagedelete = require('./routes/company')
const PORT = 5000;
const axios = require("axios");
require("dotenv").config();

//midllwere
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/User", User);
app.use("/auth", Adduser);
app.use("/deleteuser/:id", deleteUser);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders", patchOrder);
app.use('/api/company', companyRoutes);
app.use('/api/company' , imagedelete);
app.use("/api/company-orders", companyOrders);

//connecttodb
connectToMongoDB();

app.listen(PORT, () => console.log(`Srver is Stared at PORT : ${PORT}`));
