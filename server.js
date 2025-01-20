// Импортирование зависимостей
import express from 'express';
import path from 'path';
import { sequelize, Anime } from './db.js'; // Импорт из db.js
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Указываем статическую папку для раздачи файлов
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Для обработки JSON-запросов

// Подключение к базе данных
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно!');
        await sequelize.sync(); // Создание таблиц
        console.log('Таблицы созданы.');
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err);
    }
})();

app.get('/', async (req, res) => {
    try {
        const animeList = await Anime.findAll();
        res.send(`<!DOCTYPE html>
            <html lang="ru">
            <head><meta charset="UTF-8"><title>Главная страница</title></head>
            <body>
                ${animeList.map(anime => `<h3><a href="/anime/${anime.id}">${anime.title}</a></h3>`).join('')}
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка сервера');
    }
});
app.get('/anime/:id', async (req, res) => {
    const animeId = req.params.id;
    try {
        const anime = await Anime.findByPk(animeId);
        if (anime) {
            res.send(`<!DOCTYPE html>
                <html lang="ru">
                <head>
                    <meta charset="UTF-8">
                    <title>${anime.title}</title>
                    
                    <link rel="stylesheet" href="/css/styles.css">

                </head>
                <body>
                    <header>
                        <a href="/" class="logo">Логотип</a>
                        <ul class="nav-links">
                            <li><a href="/">Главная</a></li>
                            <li><a href="#">О нас</a></li>
                            <li><a href="#">Услуги</a></li>
                            <li><a href="#">Контакты</a></li>
                        </ul>
                    </header>
                    
                    <main>
                        <section class="anime-detail">
                            <div class="container">
                                <h1>${anime.title}</h1>
                                <p>${anime.description}</p>
                                <div class="video-player">
                                    <video controls>
                                        <source src="${anime.videoPath}" type="video/mp4">
                                        Ваш браузер не поддерживает видео.
                                    </video>
                                </div>
                                <button>Продолжить просмотр</button>
                            </div>
                        </section>
                    </main>
                    
                    <script>
                        const menuToggle = document.getElementById('menu-toggle');
                        const navLinks = document.getElementById('nav-links');
                        menuToggle.addEventListener('click', () => {
                            navLinks.classList.toggle('active');
                        });
                    </script>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('Аниме не найдено');
        }
    } catch (error) {
        console.error('Ошибка при получении аниме:', error);
        res.status(500).send('Ошибка сервера');
    }
});



app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
