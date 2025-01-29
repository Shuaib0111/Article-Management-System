const Category = require("../models/categoryModel");

const getAllCategories = async (req,res)=>{
    try{
        const allCategories = await Category.find();
        res.json({message:"All categories fetched successfully",success:true,allCategories:allCategories})
    }
    catch(err){
        res.status(400).json({message:err.message,success:false});
    }
}
const addCategories = async (req,res)=>{
    try{
        const {title} = req.body;
        if(title){
            const createdCategory = await Category.create({
                title
            });
            res.json({message:"category created successfully",success:true,category:createdCategory});
        }
        else{
            res.json({message: "Title is required",success:false});
        }
    }
    catch(err){
        res.status(400).json({message:err.message, success:false});
    }
}

module.exports = {
    getAllCategories,
    addCategories
}