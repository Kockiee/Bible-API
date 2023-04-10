const express = require('express');
const router = express.Router();

const bibleController = require("./controllers/bibleController");
const authController = require("./controllers/authController");

const authMiddleware = require("./middlewares/authMiddlewares");

router.get('/books', authMiddleware.validateBodyToken, bibleController.getAllBooks);

router.get('/book/:abbrev', authMiddleware.validateBodyToken, bibleController.getBook);

router.get('/books/:book/:chapter', authMiddleware.validateBodyToken, bibleController.getChapter);

router.get('/books/:book/:chapter/:verse', authMiddleware.validateBodyToken, bibleController.getVerse);

router.get('/dailyverse', authMiddleware.validateBodyToken, bibleController.getDailyVerse);

router.get('/', (req, res) => {res.status(200).json({message: "success"})});

router.get('/search/:words', authMiddleware.validateBodyToken, bibleController.searchWords);

router.get('/randomverse', authMiddleware.validateBodyToken, bibleController.generateRandomVerse);

router.post('/user/createuser', authMiddleware.validateBodyUserAndPassword, authController.createUser);

router.get('/user/gettoken', authMiddleware.validateBodyUserAndPassword, authController.getToken);

module.exports = router;