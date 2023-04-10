const connection = require('./connection');
const getAllBooks = async() => {
    const [books] = await connection.execute('SELECT * FROM books');
    return books;
};

const getBook = async(abbrev) => {
    const [book] = await connection.execute('SELECT * FROM books WHERE abbrev = ?', [abbrev]);
    return book;
};

const getChapter = async(book, chapter) => {
    const [chapterVerses] = await connection.execute('SELECT * FROM verses WHERE book = ? AND chapter = ?', [book, chapter]);
    return chapterVerses;
};

const getVerse = async(book, chapter, verse) => {
    const [verseText] = await connection.execute('SELECT * FROM verses WHERE book = ? AND chapter = ? AND verse = ?', [book, chapter, verse]);
    return verseText;
};

const generateRandomVerse = async() => {
    const [randomVerse] = await connection.execute('SELECT text FROM verses ORDER BY RAND() LIMIT 1');
    return randomVerse
};

const getDailyVerse = async() => {
    const [dailyVerse] = await connection.execute('SELECT * FROM dailyverse WHERE id = 1');
    return dailyVerse;
};

const searchWords = async(words) => {
    const [versesText] = await connection.execute('SELECT text FROM verses WHERE text LIKE "%' + words + '%" LIMIT 10');
    return versesText;
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