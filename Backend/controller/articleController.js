const Article = require("../models/articleModel")

const createArticle = async (req,res)=>{
    const {title, category, description} = req.body;
    try{
        if(title && category && description){
            const createdArticle = await Article.create({
                title,
                category,
                description,
                thumbnail: req.file.filename,
                user: req.user._id
            });
            if(createdArticle){
                res.json({message:"Article added successfully",success:true});
            }
            else{
                res.json({message: "Error while creating new Article",success: false});
            }
        }
        else{
            res.json({message:"All fields are required",success: false});
        }
    }
    catch(err){
        res.status(400).json({message:err.message, success:false})
    }
}
const getAllArticles = async (req,res)=>{
    try{
        const allArticles = await Article.find({user: req.user._id}).populate("category", "title");
        if(allArticles){
            res.json({message:"All articles fetched successfully...",success:true,articles:allArticles});
        }
        else{
            res.json({message:"No articles found",success: false});
        }
    }
    catch(err){
        res.status(400).json({message:err.message,success:false});
    }
}

const getOneArticle = async (req,res)=>{
    const {id} = req.params;
    try{
        if(id){
            const article = await Article.findById(id).populate("category","title");
            return res.json({message:"Article Fetched Successfully",success:true,article});
        }
        else{
            res.json({message:"Invalid URL",success:false});
        }
    }
    catch(err){
        res.status(400).json({message:err.message,success:false});
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getOneArticle
}