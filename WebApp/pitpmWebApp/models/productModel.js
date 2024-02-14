const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite'); // Подключение к базе данных SQLite

// Модель для управления продуктами в базе данных SQLite
const productModel = {
    // Инициализация таблицы 'products' в базе данных
    init() {
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    description TEXT,
                    price REAL
                )
            `);
        });
    },

    // Получение всех продуктов из таблицы 'products'
    getAllProducts() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    },

    // Получение продукта по его ID
    getProductById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    },

    // Создание нового продукта в таблице 'products'
    createProduct(product) {
        return new Promise((resolve, reject) => {
            const { name, description, price } = product;
            db.run('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ id: this.lastID, ...product });
            });
        });
    },

    // Обновление информации о продукте по его ID
    updateProduct(id, product) {
        return new Promise((resolve, reject) => {
            const { name, description, price } = product;
            db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ id: id, ...product });
            });
        });
    },

    // Удаление продукта по его ID
    deleteProduct(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
};

productModel.init(); // Инициализация таблицы при загрузке модели

module.exports = productModel; // Экспорт модели для использования в других файлах
