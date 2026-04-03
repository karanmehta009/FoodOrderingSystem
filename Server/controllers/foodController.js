import Food from "../models/Food.js";

export const addFood = async (req, res) =>{
  try {
    const {name, price, category} = req.body;
     
    const food = await Food.create ({
        name,
        price,
        category,
    });
    res.status(201).json({
        message: "Food Added Sucessfully", food,
    });
  } catch (error) {
    res.status(500).json({
        message:"Error Adding Food",
        error: error.message,
    });
    
  }
};

// get food  with category name

export const getFoods = async(req, res) =>{
     try {
        const foods = await Food.find().populate("category"); //.populate will give full category
        res.json({foods});
     } catch (error) {
        res.status(500).json({
            message:"Error fetching foods",
            error:error.message,
        });
     }
};