import Cart from "../models/cart.js";

//Add item to cart

export const addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    //if cart not exists then create
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ food: foodId, quantity }],
      });
    } else {
      //check if item already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.food.toString() === foodId,
      );

      if (itemIndex > -1) {
        //update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        //add new Items
        cart.items.push({ food: foodId, quantity });
      }
      await cart.save();
    }
    res.json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

//Get cart

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food",
    );
    res.json({ cart });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// Remove Item form cart

export const removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter((item) => item.food.toString() !== foodId);
    await cart.save();
    res.json({ message: "item removed", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error removing item",
      error: error.message,
    });
  }
};

//clear cart

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "cart cleared " });
  } catch (error) {
    res.status(500).json({
      message: "Error clearing cart ",
      error: error.message,
    });
  }
};
