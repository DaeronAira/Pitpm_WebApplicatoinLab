// Подключение необходимых модулей
const { decode } = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils');

// Middleware для проверки роли "admin"
function checkAdmin(req, res, next) {
    // Получение токена из заголовков запроса
    const token = req.headers.authorization;

    // Проверка наличия токена
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Декодирование токена
        const decoded = jwtUtils.verifyToken(token);

        // Проверка роли пользователя
        if (decoded.role !== 'admin') {
            console.log(decoded.role); // Логирование роли для отладки
            console.log(token); // Логирование токена для отладки
            return res.status(403).json({ error: 'Access denied' });
        }

        // Продолжение выполнения следующего middleware или обработчика маршрута
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Экспорт middleware для использования в других модулях
module.exports = { checkAdmin };