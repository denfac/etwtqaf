const { connectDB, Anime } = require('./db');  // Путь к db.js

async function sync() {
    await connectDB();  // Подключаемся к базе данных

    // Синхронизация всех моделей с базой данных
    await Anime.sync({ force: true }); // force: true перезапишет таблицу
    console.log("Модели синхронизированы с базой данных!");
}

sync();
