const bibleModel = require('../models/bibleModel');

const getAllBooks = async(req, res) => {
    const books = await bibleModel.getAllBooks();
    return res.status(200).json(books);
};

const getBook = async(req, res) => {
    const { abbrev } = req.params;
    const book = await bibleModel.getBook(abbrev);
    return res.status(200).json(book);
};

const getChapter = async(req, res) => {
    const { book, chapter } = req.params;
    const chapterVerses = await bibleModel.getChapter(book, chapter);
    return res.status(200).json(chapterVerses);
};

const getVerse = async(req, res) => {
    const { book, chapter, verse } = req.params;
    const verseText = await bibleModel.getVerse(book, chapter, verse);
    return res.status(200).json(verseText);
};

const generateRandomVerse = async(req, res) => {
    const randomVerse = await bibleModel.generateRandomVerse();
    return res.status(200).json(randomVerse);
};

const getDailyVerse = async (req, res) => {
    const dailyverse = await bibleModel.getDailyVerse();
    return res.status(200).json(dailyverse);
};

const searchWords = async(req, res) => {
    const { words } = req.params;
    const versesText = await bibleModel.searchWords(words);
    return res.status(200).json(versesText);
};

module.exports = {
    getAllBooks,
    getBook,
    getChapter,
    getVerse,
    generateRandomVerse,
    getDailyVerse,
    searchWords
};