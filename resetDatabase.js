const { sequelize, Anime, AnimeEpisode } = require("./db");

(async () => {
    try {
        // Пересоздание таблиц
        await sequelize.sync({ force: true });
        console.log("Таблицы пересозданы.");
    } catch (error) {
        console.error("Ошибка при пересоздании таблиц:", error);
    } finally {
        await sequelize.close();
        console.log("Подключение к базе данных закрыто.");
    }
})();
