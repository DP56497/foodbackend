// controllers/orderController.js
const { v4: uuidv4 } = require("uuid");

let orders = [];

// Get All Orders
const getOrders = async (req, res) => {
  try {
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add New Order
const addOrder = async (req, res) => {
  try {
    const { foodname, price } = req.body;

    // Validate input
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;

    if (!foodname || typeof foodname !== "string" || isNaN(parsedPrice)) {
      return res.status(400).json({
        error:
          "Invalid order data. Ensure foodname is a string and price is a valid number.",
      });
    }

    const newOrder = {
      id: uuidv4(),
      foodname: foodname.trim(),
      price: parsedPrice,
    };

    orders.push(newOrder); //Add to module-level array

    res.status(201).json({
      message: "Order added successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Example orders array (global)

// const patchOrder = (req, res) => {
//   try {
//     const { id }= req.params;
//     const { status } = req.body;
//     console.log("Request params:", req.params);
// console.log("Request body:", req.body);


//     if (!id) {
//       return res
//         .status(400)
//         .json({ error: "Order ID is missing in the request URL" });
//     }

//     if (!status) {
//       return res
//         .status(400)
//         .json({ error: "Status is missing in the request body" });
//     }

//     if (!["pending", "done", "stuck", "processing"].includes(status)) {
//       return res.status(400).json({
//         error: "Invalid status. Must be pending, done, stuck, or processing.",
//       });
//     }

//     const order = orders.find((order) => String(order.id) === String(id));

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     order.status = status;

//     res.json({ message: "Order status updated successfully", order });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



const patchOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      console.log(" Order ID is missing in URL");
      return res.status(400).json({ message: "Order ID is required" });
    }

    console.log(" Order ID:", id);
    console.log("🔧 Status to update:", status);

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order: updated });
  } catch (error) {
    console.error(" Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const companyOrders = (req, res) => {
  const done = orders.filter((order) => order.status === "done");
  const processing = orders.filter((order) => order.status === "pending");
  const stuck = orders.filter((order) => order.status === "stuck");

  res.json({
    done: done.map((o) => ({
      id: o.id,
      foodname: o.foodname,
      price: o.price,
    })),
    processing: processing.map((o) => ({
      id: o.id,
      foodname: o.foodname,
      price: o.price,
    })),
    stuck: stuck.map((o) => ({
      id: o.id,
      foodname: o.foodname,
      price: o.price,
    })),
  });
};

// const companyOrders = (req, res) => {
//   const done = orders.filter((order) => order.status === "done");
//   const processing = orders.filter((order) => order.status === "pending");
//   const stuck = orders.filter((order) => order.status === "stuck");

//   res.json({
//     done: done.map((o) => ({ foodname: o.foodname, price: o.price })),
//     processing: processing.map((o) => ({
//       foodname: o.foodname,
//       price: o.price,
//     })),
//     stuck: stuck.map((o) => ({ foodname: o.foodname, price: o.price })),
//   });
// };

module.exports = {
  getOrders,
  addOrder,
  patchOrder,
  companyOrders,
};
