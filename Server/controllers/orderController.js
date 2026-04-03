import Cart from "../models/cart.js";
import Order from "../models/Order.js";

//Create Order

export const createOrder = async (req, res) => {
  try {
    const { foods, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id, //from auth middleware
      foods,
      totalPrice,
    });
    res.status(201).json({
      message: "order placed Suceesfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

//get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("foods")
      .sort({ createdAt: -1 });
    res.json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "error fetching user orders",
      error: error.message,
    });
  }
};

// Get all user order for (admin)

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("foods")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all Orders",
      error: error.message,
    });
  }
};

// Update Order Status

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    res.json({
      message: "order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating order",
      error: error.message,
    });
  }
};

// Create Order from Cart

export const createOrderFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    // Prepare foods array for order
    const orderFoods = cart.items.map((item) => {
      totalPrice += item.food.price * item.quantity;
      return {
        food: item.food._id,
        quantity: item.quantity,
      };
    });

    // Create Order
    const order = await Order.create({
      user: req.user._id,
      foods: orderFoods,
      totalPrice,
    });

    // Clear cart after order
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      message: "Order Placed from cart",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order from cart",
      error: error.message,
    });
  }
};