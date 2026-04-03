import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
    name: {
        type :String,
        required: true,
        unique: true,

    },
},
    {timestamps: true}
);
 
const Category = mongoose.model("Category", catagorySchema);
export default Category;