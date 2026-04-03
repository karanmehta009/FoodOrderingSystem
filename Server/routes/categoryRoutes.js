import express from "express";;
import {addCategory, getCategories} from "../controllers/categoryController.js";

const router = express.Router();

//add category (admin)
router.post("/add", addCategory);

//get all categories

router.get("/", getCategories);

export default router;