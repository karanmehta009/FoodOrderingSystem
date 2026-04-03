import mongoose from "mongoose";
 
//food model and add category reference
const foodSchema = new mongoose.Schema ({
    name:{
        type : String,
        required:true,

    },
    price:{
        type:Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("Food", foodSchema);