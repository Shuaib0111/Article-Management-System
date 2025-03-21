const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true  
    },
    description: {
        type: String,
        required: true  
    },
    thumbnail: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true  
    }
}, { timestamps: true });  

const articleModel = mongoose.model("articles", articleSchema);

module.exports = articleModel;
