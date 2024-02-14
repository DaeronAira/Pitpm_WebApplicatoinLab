const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const { checkAdmin } = require('../middleware/authMiddleware');

// Маршруты для продуктов
// Получение всех продуктов
router.get('/products', productsController.getAllProducts);
// Получение продукта по ID
router.get('/products/:id', productsController.getProductById);
// Добавление нового продукта (только для админов)
router.post('/products', checkAdmin, productsController.createProduct);
// Обновление продукта по ID (только для админов)
router.put('/products/:id', checkAdmin, productsController.updateProduct);
// Удаление продукта по ID (только для админов)
router.delete('/products/:id', checkAdmin, productsController.deleteProduct);

const authController = require('../controllers/authController');

// Получение всех пользователей
router.get('/user', authController.getAllUsers);
// Регистрация нового пользователя
router.post('/register', authController.register);
// Вход пользователя
router.post('/login', authController.login);

module.exports = router;
