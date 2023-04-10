const app = require('./app');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
const connection = require('./models/connection');

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    rule.tz = 'America/Sao_Paulo';

    const job = schedule.scheduleJob(rule, async function () {
        // connection.execute("IF NOT EXISTS INSERT IGNORE INTO dailyverse (version, testament, book, chapter, verse, text, abbrev) (null, null, null, null, null, null, null)");
        const query = `
        UPDATE dailyverse d
          INNER JOIN (
            SELECT id, version, testament, book, chapter, verse, text, abbrev
            FROM verses
            WHERE id >= RAND() * (SELECT MAX(id) FROM verses)
            ORDER BY id LIMIT 1
            FOR UPDATE
          ) v ON 1 = 1
          SET d.version = v.version,
              d.testament = v.testament,
              d.book = v.book,
              d.chapter = v.chapter,
              d.verse = v.verse,
              d.text = v.text,
              d.abbrev = v.abbrev
          WHERE d.id = 1;
        `;
        await connection.execute(query);
    });
});