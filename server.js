// server.js
const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

// Создаем Express-приложение
const app = express();
const PORT = process.env.PORT || 8080;

// Обслуживаем статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Если потребуется, можно явно отдавать index.html для корневого URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Создаем HTTP-сервер с помощью Express
const server = http.createServer(app);

// Создаем WebSocket-сервер, используя тот же HTTP-сервер
const wss = new WebSocket.Server({ server });

// Обработка WebSocket-подключений
wss.on('connection', (ws) => {
  console.log('Новое WebSocket-соединение установлено.');

  ws.on('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.error('Неверный формат сообщения:', message);
      return;
    }

    // Для типа "join" сохраняем информацию о комнате и идентификаторе клиента
    if (data.type === 'join') {
      ws.room = data.room;
      ws.clientId = data.id;
      console.log(`Клиент ${data.id} присоединился к комнате ${data.room}`);
    }

    // Транслируем сообщение остальным участникам в той же комнате
    wss.clients.forEach(client => {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.room === data.room
      ) {
        // Если указан target, отправляем только конкретному клиенту
        if (data.target && data.target !== client.clientId) return;
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log(`Соединение клиента ${ws.clientId || 'неизвестный'} закрыто.`);
    // Здесь можно реализовать уведомление о выходе клиента из комнаты.
  });

  ws.on('error', (error) => {
    console.error("Ошибка WebSocket:", error);
  });
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
