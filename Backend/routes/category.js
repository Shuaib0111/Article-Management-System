const express = require('express');
const router = express.Router();
const {getAllCategories, addCategories} = require('../controller/categoriesController');
const isUserAuthenticated = require('../middlewares/authMiddleware');

router.get("/get/allCategories",isUserAuthenticated,getAllCategories);
router.post("/create",isUserAuthenticated,addCategories);

module.exports = router;