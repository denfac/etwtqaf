const { sequelize, Anime, AnimeEpisode } = require("./db");

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Успешное подключение к базе данных.");

        // Добавление аниме
        const anime = await Anime.create({
            title: "Example Anime",
            description: "An example anime description.",
        });

        // Добавление эпизодов
        const episodes = [
            {
                episodeNumber: 1,
                title: "Episode 1",
                description: "Description of episode 1",
                filePath: "path/to/episode1.mp4",
                animeId: anime.id,
            },
            {
                episodeNumber: 2,
                title: "Episode 2",
                description: "Description of episode 2",
                filePath: "path/to/episode2.mp4",
                animeId: anime.id,
            },
        ];

        await AnimeEpisode.bulkCreate(episodes);
        console.log("Данные успешно добавлены.");
    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
    } finally {
        await sequelize.close();
        console.log("Подключение к базе данных закрыто.");
    }
})();
