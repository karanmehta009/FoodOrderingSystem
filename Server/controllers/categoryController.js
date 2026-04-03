import Category from "../models/Category.js";
 
//add category (admin)

export const addCategory = async (req, res) =>{
    try {
        const {name} = req.body;
        //check if category already exists
        const exists = await Category.findOne({name});
        if (exists) return res.status(400).json({message:"category already exists"});
        //create category if not exists
        const category = await Category.create({name});
        res.status(201).json({message:"category created successfully", category});

    } catch (error) {
        res.status(500).json({message:"Error creating Category",error:error.message});
        
    }
};
//Get All Categories 
export const getCategories = async (req, res) =>{
    try {
        const catagories = await Category.find().sort({createAt: -1});
        res.json({catagories});
    } catch (error) {
        res.status(500).json({message:"Error fetching Categories", error:error.message});
    }
}