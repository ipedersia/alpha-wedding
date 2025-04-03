import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const port = process.env.PORT;
const app = express();
const __dirname = path.resolve(); // Получаем корневую папку

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Указываем статическую папку

// Все остальные запросы отправляем на index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
