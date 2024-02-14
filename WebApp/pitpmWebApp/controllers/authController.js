const jwtUtils = require('../utils/jwtUtils'); // Подключение модуля для работы с JWT
const userModel = require('../models/userModel'); // Подключение модели пользователя

const authController = {
    // Регистрация нового пользователя
    async register(req, res) {
        const { firstName, lastName, middleName, city, role } = req.body;

        try {
            const result = await userModel.createUser(firstName, lastName, middleName, city, role);
            res.json({ id: result.id, message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Вход пользователя
    async login(req, res) {
        const { firstName, lastName } = req.body;

        try {
            const user = await userModel.findUserByName(firstName, lastName); // Поиск пользователя по имени

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Генерация токена с учетом ID, имени, фамилии и роли пользователя
            const token = jwtUtils.generateToken({ id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Получение всех пользователей
    async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = authController;
