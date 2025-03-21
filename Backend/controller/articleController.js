const Article = require("../models/articleModel");

// Create an article
const createArticle = async (req, res) => {
    const { title, category, description } = req.body;
    try {
        if (!title || !category || !description || !req.file) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const createdArticle = await Article.create({
            title,
            category,
            description,
            thumbnail: req.file.filename,
            user: req.user._id
        });

        res.status(201).json({ message: "Article added successfully", success: true, article: createdArticle });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// Get all articles (for homepage)
const getAllArticles = async (req, res) => {
    try {
        const allArticles = await Article.find().populate("category", "title").populate("user", "name");
        
        if (allArticles.length === 0) {
            return res.status(404).json({ message: "No articles found", success: false });
        }

        res.json({ message: "All articles fetched successfully", success: true, articles: allArticles });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};


const getUserArticles = async (req, res) => {
    try {
        const userArticles = await Article.find({ user: req.user._id }).populate("category", "title");

        res.status(200).json({ 
            message: userArticles.length > 0 ? "User articles fetched successfully" : "No articles found",
            success: true,
            articles: userArticles 
        });
    } catch (err) {
        res.status(500).json({ 
            message: err.message || "Internal Server Error", 
            success: false 
        });
    }
};



// Get a single article
const getOneArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id).populate("category", "title").populate("user", "name");

        if (!article) {
            return res.status(404).json({ message: "Article not found", success: false });
        }

        res.json({ message: "Article fetched successfully", success: true, article });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// Delete an article 
const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findOne({ _id: id, user: req.user._id });

        if (!article) {
            return res.status(403).json({ message: "You can only delete your own articles", success: false });
        }

        await Article.findByIdAndDelete(id);
        res.json({ message: "Article deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getUserArticles, 
    getOneArticle,
    deleteArticle 
};
