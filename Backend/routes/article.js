const express = require('express');
const {createArticle , getAllArticles, getOneArticle} = require('../controller/articleController')
const router = express.Router();
const isUserAuthenticated = require('../middlewares/authMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/upload/');
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

router.post('/create',upload.single("thumbnail"),isUserAuthenticated,createArticle);
router.get('/get/allArticles',isUserAuthenticated,getAllArticles);
router.get("/get/singleArticle/:id",isUserAuthenticated,getOneArticle)

module.exports = router;