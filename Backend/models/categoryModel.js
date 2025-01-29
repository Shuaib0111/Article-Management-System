const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    title:{
        type: String
    }
});

const categoryModel = mongoose.model("categories",categorySchema);
module.exports = categoryModel;