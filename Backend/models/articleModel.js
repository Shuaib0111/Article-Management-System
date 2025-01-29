const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type: String
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    description:{
        type: String
    },
    thumbnail:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const articleModel = mongoose.model("articles",articleSchema);

module.exports = articleModel;